import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginRegisterInput } from "../utils/Inputs";
import argon2 from "argon2";
import { LoginRegisterResponse } from "../utils/Return";
import { CtxTypes } from "../utils/CtxTypes";
import { COOKIE_NAME } from "../utils/constants";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: CtxTypes): Promise<User | undefined | null> {
    console.log(req.session.userId);
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  getUser(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return User.findOne(id);
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
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: CtxTypes): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    await User.delete({ id });
    return true;
  }
}
