import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginRegisterInput } from "../utils/Inputs";
import argon2 from "argon2";
import { LoginRegisterResponse, UserBooks } from "../utils/Return";
import { CtxTypes } from "../utils/CtxTypes";
import { COOKIE_NAME } from "../utils/constants";
import { createQueryBuilder, getRepository } from "typeorm";
import { Book } from "src/entities/Book";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: CtxTypes): Promise<User | undefined | null> {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
    // done
  }

  @Query(() => User, { nullable: true })
  async getUserBooks(
    @Arg("id", () => Int) id: number
  ): Promise<User | undefined> {
    // const user = await User.findOne(id, {
    //   relations: ["booksAdded", "bookmarks"],
    // });
    // console.log(user);

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.booksAdded", "booksadded")
      .leftJoinAndSelect("user.bookmarks", "bookmarks")
      .where("user.id = :id", { id })
      .getOne();

    // const user = await getRepository(User)
    //   .createQueryBuilder("user")
    //   .leftJoinAndSelect("user.booksAdded", "booksadded")
    //   .leftJoinAndSelect("user.bookmarks", "bookmarks")
    //   .where("user.id = :id", { id })
    //   .getOne();
    console.log(user);

    return user;
  }

  @Mutation(() => LoginRegisterResponse)
  async registerUser(
    @Arg("input") input: LoginRegisterInput,
    @Ctx() { req }: CtxTypes
  ): Promise<LoginRegisterResponse> {
    let newUser;
    const hashedPw = await argon2.hash(input.password);
    try {
      newUser = await User.create({
        username: input.username,
        password: hashedPw,
      }).save();
    } catch (err) {
      if (err.code == "23505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "This username already exists.",
            },
          ],
        };
      }
    }
    req.session.userId = newUser?.id;
    return { user: newUser };
  }

  @Mutation(() => LoginRegisterResponse)
  async loginUser(
    @Arg("input", { validate: false }) input: LoginRegisterInput,
    @Ctx() { req }: CtxTypes
  ): Promise<LoginRegisterResponse> {
    const user = await User.findOne({
      where: { username: input.username },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "No such username. Please create an account!",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password :/",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
    // done
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: CtxTypes): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
    // done
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    await User.delete({ id });
    return true;
  }
}
