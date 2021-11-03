"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const book_1 = require("./resolvers/book");
const user_1 = require("./resolvers/user");
const BookmarkStatusLoader_1 = require("./utils/BookmarkStatusLoader");
const constants_1 = require("./utils/constants");
require("dotenv").config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [path_1.default.join(__dirname, "./entities/*")],
    });
    yield connection.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN.split(", "),
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? ".vienvien.online" : undefined,
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [book_1.BookResolver, user_1.UserResolver],
        }),
        context: ({ req, res }) => ({
            req,
            res,
            bookmarkStatusLoader: BookmarkStatusLoader_1.bookmarkStatusLoader(),
        }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`server started on localhost ${port}`);
    });
});
startServer().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map