import { User } from "../entities/User";
import { ObjectType, Field } from "type-graphql";
import { Book } from "../entities/Book";

@ObjectType()
export class Error {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class LoginRegisterResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class BookReturn {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => Boolean, { nullable: true })
  book?: Boolean;
}

@ObjectType()
export class Pagination {
  @Field(() => [Book], { nullable: true })
  books: Book[];

  @Field()
  moreBooks: boolean;
}
