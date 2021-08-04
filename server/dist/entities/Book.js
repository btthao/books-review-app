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
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Rating_1 = require("./Rating");
let Book = class Book extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Book.prototype, "plot", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Book.prototype, "year", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "totalRaters", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "totalStars", void 0);
__decorate([
    type_graphql_1.Field(() => [Rating_1.Rating], { nullable: true }),
    typeorm_1.OneToMany(() => Rating_1.Rating, (rating) => rating.book),
    __metadata("design:type", Array)
], Book.prototype, "ratedBy", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User], { nullable: true }),
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.bookmarks),
    __metadata("design:type", Array)
], Book.prototype, "bookmarkedBy", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.booksAdded),
    __metadata("design:type", User_1.User)
], Book.prototype, "poster", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], Book.prototype, "bookmarkStatus", void 0);
Book = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map