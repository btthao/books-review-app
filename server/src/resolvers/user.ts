import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { COOKIE_NAME } from "../utils/constants";
import { CtxTypes } from "../utils/CtxTypes";
import { LoginRegisterInput } from "../utils/Inputs";
import { LoginRegisterResponse } from "../utils/Return";
import bcrypt from "bcrypt";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: CtxTypes): Promise<User | undefined | null> {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  async getUserBooks(
    @Arg("id", () => Int) id: number
  ): Promise<User | undefined> {
    const user = await User.findOne(id, {
      relations: ["booksAdded", "bookmarks"],
    });

    return user;
  }

  @Mutation(() => LoginRegisterResponse)
  async registerUser(
    @Arg("input") input: LoginRegisterInput,
    @Ctx() { req }: CtxTypes
  ): Promise<LoginRegisterResponse> {
    let newUser;
    const hashedPw = bcrypt.hashSync(input.password, 10);
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

    const valid = bcrypt.compareSync(input.password, user.password);

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
  }

  // @Mutation(() => Boolean)
  // async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
  //   await User.delete({ id });
  //   return true;
  // }
}
