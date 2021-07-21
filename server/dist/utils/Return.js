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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.BookReturn = exports.LoginRegisterResponse = exports.Error = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const Book_1 = require("../entities/Book");
let Error = class Error {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Error.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Error.prototype, "message", void 0);
Error = __decorate([
    type_graphql_1.ObjectType()
], Error);
exports.Error = Error;
let LoginRegisterResponse = class LoginRegisterResponse {
};
__decorate([
    type_graphql_1.Field(() => [Error], { nullable: true }),
    __metadata("design:type", Array)
], LoginRegisterResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], LoginRegisterResponse.prototype, "user", void 0);
LoginRegisterResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginRegisterResponse);
exports.LoginRegisterResponse = LoginRegisterResponse;
let BookReturn = class BookReturn {
};
__decorate([
    type_graphql_1.Field(() => [Error], { nullable: true }),
    __metadata("design:type", Array)
], BookReturn.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], BookReturn.prototype, "book", void 0);
BookReturn = __decorate([
    type_graphql_1.ObjectType()
], BookReturn);
exports.BookReturn = BookReturn;
let Pagination = class Pagination {
};
__decorate([
    type_graphql_1.Field(() => [Book_1.Book], { nullable: true }),
    __metadata("design:type", Array)
], Pagination.prototype, "books", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Pagination.prototype, "moreBooks", void 0);
Pagination = __decorate([
    type_graphql_1.ObjectType()
], Pagination);
exports.Pagination = Pagination;
//# sourceMappingURL=Return.js.map