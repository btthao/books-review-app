"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Book_1 = require("../entities/Book");
const Inputs_1 = require("../utils/Inputs");
const isAuth_1 = require("../utils/isAuth");
const Return_1 = require("../utils/Return");
const Rating_1 = require("../entities/Rating");
const isPoster_1 = require("../utils/isPoster");
const User_1 = require("../entities/User");
let BookResolver = class BookResolver {
    bookmarkStatus(book, { req, bookmarkStatusLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const bookmarked = yield bookmarkStatusLoader.load({
                bookId: book.id,
                userId: req.session.userId,
            });
            return bookmarked;
        });
    }
    rate(bookId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasRated = yield Rating_1.Rating.findOne({
                where: { bookId, userId: req.session.userId },
            });
            if (!hasRated) {
                yield Rating_1.Rating.create({
                    bookId,
                    userId: req.session.userId,
                    value,
                }).save();
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Book_1.Book)
                    .set({
                    totalStars: () => `"totalStars" + ${value}`,
                    totalRaters: () => `"totalRaters" + 1`,
                })
                    .where("id = :bookId", {
                    bookId,
                })
                    .execute();
            }
            else if (hasRated.value !== value) {
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Rating_1.Rating)
                    .set({ value })
                    .where('"userId" = :userId', {
                    userId: req.session.userId,
                })
                    .andWhere('"bookId" = :bookId', {
                    bookId,
                })
                    .execute();
                yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Book_1.Book)
                    .set({
                    totalStars: () => `"totalStars" - ${hasRated.value} + ${value}`,
                })
                    .where("id = :bookId", {
                    bookId,
                })
                    .execute();
            }
            return true;
        });
    }
    getBooks(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const booksToShow = typeorm_1.getConnection()
                .getRepository(Book_1.Book)
                .createQueryBuilder()
                .orderBy("id", "DESC");
            if (cursor) {
                booksToShow.where("id < :cursor", { cursor });
            }
            const books = yield booksToShow.take(limit + 1).getMany();
            return {
                moreBooks: books.length == limit + 1,
                books: books.slice(0, limit),
            };
        });
    }
    getBook(id) {
        return Book_1.Book.findOne(id, { relations: ["poster", "ratedBy"] });
    }
    createBook(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldBook = yield Book_1.Book.findOne({
                where: { title: input.title, author: input.author },
            });
            if (oldBook) {
                return {
                    errors: [
                        {
                            field: "title",
                            message: "This book already exists.",
                        },
                    ],
                };
            }
            const book = yield Book_1.Book.create(Object.assign({}, input)).save();
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(Book_1.Book, "poster")
                .of(book.id)
                .set(req.session.userId);
            return { book };
        });
    }
    editPlot(id, plot) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Book_1.Book)
                .set({ plot })
                .where("id = :id", {
                id,
            })
                .execute();
            return true;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection().query(`
    delete
    from user_bookmarks_book b
    where b."bookId" = $1
    `, [id]);
            yield Book_1.Book.delete({ id });
            return true;
        });
    }
    bookmark(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(User_1.User, "bookmarks")
                .of(req.session.userId)
                .add(id);
            return true;
        });
    }
    removeBookmark(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(User_1.User, "bookmarks")
                .of(req.session.userId)
                .remove(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => Boolean, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Book_1.Book, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "bookmarkStatus", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("bookId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("value", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "rate", null);
__decorate([
    type_graphql_1.Query(() => Return_1.Pagination),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "getBooks", null);
__decorate([
    type_graphql_1.Query(() => Book_1.Book, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "getBook", null);
__decorate([
    type_graphql_1.Mutation(() => Return_1.BookReturn),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Inputs_1.BookInput, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "createBook", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth, isPoster_1.isPoster),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("plot")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "editPlot", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth, isPoster_1.isPoster),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "bookmark", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "removeBookmark", null);
BookResolver = __decorate([
    type_graphql_1.Resolver(Book_1.Book)
], BookResolver);
exports.BookResolver = BookResolver;
//# sourceMappingURL=book.js.map