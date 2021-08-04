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
exports.Rating = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
const User_1 = require("./User");
let Rating = class Rating extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Rating.prototype, "value", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Rating.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.booksRated),
    __metadata("design:type", User_1.User)
], Rating.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Rating.prototype, "bookId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Book_1.Book, (book) => book.ratedBy, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Book_1.Book)
], Rating.prototype, "book", void 0);
Rating = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=Rating.js.map