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
exports.BookInput = exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let BookInput = class BookInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BookInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BookInput.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BookInput.prototype, "plot", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BookInput.prototype, "yearPublished", void 0);
BookInput = __decorate([
    type_graphql_1.InputType()
], BookInput);
exports.BookInput = BookInput;
//# sourceMappingURL=Inputs.js.map