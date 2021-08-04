import { Request, Response } from "express";
import session from "express-session";
import { bookmarkStatusLoader } from "./BookmarkStatusLoader";
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export type CtxTypes = {
  req: Request & { session: session.SessionData };
  res: Response;
  bookmarkStatusLoader: ReturnType<typeof bookmarkStatusLoader>;
};
