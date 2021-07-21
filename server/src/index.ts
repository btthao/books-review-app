import "reflect-metadata";
import { createConnection, createQueryBuilder, getRepository } from "typeorm";
import path from "path";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
import { CtxTypes } from "./utils/CtxTypes";

// import { User } from "./entities/User";
//import { Book } from "./entities/Book";

const startServer = async () => {
  await createConnection({
    type: "postgres",
    database: "bookreviews",
    username: "postgres",
    password: "qazwsx",
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [path.join(__dirname, "./entities/*")],
  });

  // const user = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .leftJoinAndSelect("user.booksAdded", "book")
  //   .where("user.id = :id", { id: 75 })
  //   .getOne();
  // const book = await getRepository(Book)
  //   .createQueryBuilder("book")
  //   .leftJoinAndSelect("book.poster", "user")
  //   .where("book.id = :id", { id: 53 })
  //   .getOne();

  // console.log(book);

  //await Book.delete({});
  // await User.delete({});

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
