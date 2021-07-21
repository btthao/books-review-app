import { CtxTypes } from "../utils/CtxTypes";
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
import { BookInput } from "../utils/Inputs";
import { isAuth } from "../utils/isAuth";
import { BookReturn, Error, Pagination } from "../utils/Return";
//import { User } from "../entities/User";

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => String)
  plotSnippet(@Root() root: Book) {
    return root.plot.slice(0, 100);
  }

  @Query(() => Pagination)
  async getBooks(
    @Arg("cursor", () => Int, { nullable: true }) cursor: number
  ): Promise<Pagination> {
    const limit = 4;
    const booksToShow = getConnection()
      .getRepository(Book)
      .createQueryBuilder("book")
      .orderBy("id", "DESC")
      .take(limit + 1);

    if (cursor) {
      booksToShow.where("id < :cursor", { cursor });
    }

    const books = await booksToShow.getMany();

    return {
      moreBooks: books.length == limit + 1,
      books: books.slice(0, limit),
    };
  }

  @Query(() => Book, { nullable: true })
  getBook(@Arg("id", () => Int) id: number): Promise<Book | undefined> {
    return Book.findOne(id);
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

    return { book: true };
  }

  @Mutation(() => Book)
  async editPlot(
    @Arg("id", () => Int) id: number,
    @Arg("plot") plot: string
  ): Promise<Book> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Book)
      .set({ plot })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Book.delete({ id });
    return true;
  }
}
