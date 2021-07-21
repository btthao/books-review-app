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
let BookResolver = class BookResolver {
    plotSnippet(root) {
        return root.plot.slice(0, 100);
    }
    getBooks(cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = 4;
            const booksToShow = typeorm_1.getConnection()
                .getRepository(Book_1.Book)
                .createQueryBuilder("book")
                .orderBy("id", "DESC")
                .take(limit + 1);
            if (cursor) {
                booksToShow.where("id < :cursor", { cursor });
            }
            const books = yield booksToShow.getMany();
            return {
                moreBooks: books.length == limit + 1,
                books: books.slice(0, limit),
            };
        });
    }
    getBook(id) {
        return Book_1.Book.findOne(id);
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
            return { book: true };
        });
    }
    editPlot(id, plot) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Book_1.Book)
                .set({ plot })
                .where("id = :id", {
                id,
            })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Book_1.Book.delete({ id });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Book_1.Book]),
    __metadata("design:returntype", void 0)
], BookResolver.prototype, "plotSnippet", null);
__decorate([
    type_graphql_1.Query(() => Return_1.Pagination),
    __param(0, type_graphql_1.Arg("cursor", () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
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
    type_graphql_1.Mutation(() => Book_1.Book),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("plot")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "editPlot", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
BookResolver = __decorate([
    type_graphql_1.Resolver(Book_1.Book)
], BookResolver);
exports.BookResolver = BookResolver;
//# sourceMappingURL=book.js.map