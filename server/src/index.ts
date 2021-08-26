import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import { bookmarkStatusLoader } from "./utils/BookmarkStatusLoader";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
import { CtxTypes } from "./utils/CtxTypes";
require("dotenv").config();

const startServer = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    //synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  await connection.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        domain: __prod__ ? ".vienvien.online" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, UserResolver],
    }),

    context: ({ req, res }): CtxTypes => ({
      req,
      res,
      bookmarkStatusLoader: bookmarkStatusLoader(),
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () => {
    console.log(`server started on localhost ${process.env.PORT}`);
  });
};

startServer().catch((err) => console.error(err));
