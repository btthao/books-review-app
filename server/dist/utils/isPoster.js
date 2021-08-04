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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPoster = void 0;
const Book_1 = require("../entities/Book");
const isPoster = ({ context, args }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield Book_1.Book.findOne({
        where: { id: args.id },
        relations: ["poster"],
    });
    if ((book === null || book === void 0 ? void 0 : book.poster.id) !== context.req.session.userId) {
        throw new Error("not this book's owner");
    }
    return next();
});
exports.isPoster = isPoster;
//# sourceMappingURL=isPoster.js.map