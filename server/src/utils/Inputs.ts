import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class LoginRegisterInput {
  @Field()
  @Length(3, 10, {
    message: "Username must be between 3 and 10 characters.",
  })
  username: string;

  @Field()
  @Length(7, 20, {
    message: "Password must be between 7 and 20 characters.",
  })
  password: string;
}

@InputType()
export class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  plot: string;

  @Field()
  year: number;
}
