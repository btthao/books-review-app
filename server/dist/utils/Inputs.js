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
exports.BookInput = exports.LoginRegisterInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let LoginRegisterInput = class LoginRegisterInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(3, 20, {
        message: "Username must be between 3 and 20 characters.",
    }),
    __metadata("design:type", String)
], LoginRegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(7, 20, {
        message: "Password must be between 7 and 20 characters.",
    }),
    __metadata("design:type", String)
], LoginRegisterInput.prototype, "password", void 0);
LoginRegisterInput = __decorate([
    type_graphql_1.InputType()
], LoginRegisterInput);
exports.LoginRegisterInput = LoginRegisterInput;
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
], BookInput.prototype, "year", void 0);
BookInput = __decorate([
    type_graphql_1.InputType()
], BookInput);
exports.BookInput = BookInput;
//# sourceMappingURL=Inputs.js.map