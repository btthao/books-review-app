import { Book } from "../entities/Book";
import { MiddlewareFn } from "type-graphql";
import { getRepository } from "typeorm";
import { CtxTypes } from "./CtxTypes";

export const isPoster: MiddlewareFn<CtxTypes> = async (
  { context, args },
  next
) => {
  const book = await Book.findOne({
    where: { id: args.id },
    relations: ["poster"],
  });

  if (book?.poster.id !== context.req.session.userId) {
    throw new Error("not this book's owner");
  }

  return next();
};
