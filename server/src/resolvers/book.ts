import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Book } from "../entities/Book";
import { Rating } from "../entities/Rating";
import { User } from "../entities/User";
import { CtxTypes } from "../utils/CtxTypes";
import { BookInput } from "../utils/Inputs";
import { isAuth } from "../utils/isAuth";
import { isPoster } from "../utils/isPoster";
import { BookReturn, Pagination } from "../utils/Return";

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => Boolean, { nullable: true })
  async bookmarkStatus(
    @Root() book: Book,
    @Ctx() { req, bookmarkStatusLoader }: CtxTypes
  ) {
    if (!req.session.userId) {
      return null;
    }

    const bookmarked = await bookmarkStatusLoader.load({
      bookId: book.id,
      userId: req.session.userId,
    });

    return bookmarked;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async rate(
    @Arg("bookId", () => Int) bookId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: CtxTypes
  ): Promise<boolean> {
    const hasRated = await Rating.findOne({
      where: { bookId, userId: req.session.userId },
    });

    if (!hasRated) {
      // User never rated this book
      await Rating.create({
        bookId,
        userId: req.session.userId,
        value,
      }).save();

      await getConnection()
        .createQueryBuilder()
        .update(Book)
        .set({
          totalStars: () => `"totalStars" + ${value}`,
          totalRaters: () => `"totalRaters" + 1`,
        })
        .where("id = :bookId", {
          bookId,
        })
        .execute();
    } else if (hasRated.value !== value) {
      // user has rated before, now update
      await getConnection()
        .createQueryBuilder()
        .update(Rating)
        .set({ value })
        .where('"userId" = :userId', {
          userId: req.session.userId,
        })
        .andWhere('"bookId" = :bookId', {
          bookId,
        })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .update(Book)
        .set({
          totalStars: () => `"totalStars" - ${hasRated.value} + ${value}`,
        })
        .where("id = :bookId", {
          bookId,
        })
        .execute();
    }

    return true;
  }

  @Query(() => Pagination)
  async getBooks(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number
  ): Promise<Pagination> {
    const booksToShow = getConnection()
      .getRepository(Book)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    if (cursor) {
      booksToShow.where("id < :cursor", { cursor });
    }

    const books = await booksToShow.take(limit + 1).getMany();

    return {
      moreBooks: books.length == limit + 1,
      books: books.slice(0, limit),
    };
  }

  @Query(() => Book, { nullable: true })
  getBook(@Arg("id", () => Int) id: number): Promise<Book | undefined> {
    return Book.findOne(id, { relations: ["poster", "ratedBy"] });
  }

  @Mutation(() => BookReturn)
  @UseMiddleware(isAuth)
  async createBook(
    @Arg("input") input: BookInput,
    @Ctx() { req }: CtxTypes
  ): Promise<BookReturn> {
    const oldBook = await Book.findOne({
      where: { title: input.title, author: input.author },
    });

    if (oldBook) {
      return {
        errors: [
          {
            field: "title",
            message: "This book already exists.",
          },
        ],
      };
    }

    const book = await Book.create({
      ...input,
    }).save();

    await getConnection()
      .createQueryBuilder()
      .relation(Book, "poster")
      .of(book.id)
      .set(req.session.userId);

    return { book };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isPoster)
  async editPlot(
    @Arg("id", () => Int) id: number,
    @Arg("plot") plot: string
  ): Promise<Boolean> {
    await getConnection()
      .createQueryBuilder()
      .update(Book)
      .set({ plot })
      .where("id = :id", {
        id,
      })
      .execute();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isPoster)
  async deleteBook(@Arg("id", () => Int) id: number): Promise<boolean> {
    await getConnection().query(
      `
    delete
    from user_bookmarks_book b
    where b."bookId" = $1
    `,
      [id]
    );
    await Book.delete({ id });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async bookmark(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: CtxTypes
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarks")
      .of(req.session.userId)
      .add(id);

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeBookmark(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: CtxTypes
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .relation(User, "bookmarks")
      .of(req.session.userId)
      .remove(id);

    return true;
  }
}
