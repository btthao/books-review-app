import { Request, Response } from "express";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export type CtxTypes = {
  req: Request & { session: session.SessionData };
  res: Response;
};
