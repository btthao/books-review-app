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

const startServer = async () => {
  await createConnection({
    type: "postgres",
    database: "bookreviews",
    username: "postgres",
    password: "qazwsx",
    logging: true,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/*")],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
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
      },
      saveUninitialized: false,
      secret: "kosmonextlevel",
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

  app.listen(4000, () => {
    console.log("server started on localhost 4000");
  });
};

startServer().catch((err) => console.error(err));
