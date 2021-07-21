import { MiddlewareFn } from "type-graphql";
import { CtxTypes } from "./CtxTypes";

export const isAuth: MiddlewareFn<CtxTypes> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
