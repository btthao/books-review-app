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
exports.bookmarkStatusLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const User_1 = require("../entities/User");
const bookmarkStatusLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne(keys[0].userId, {
        relations: ["bookmarks"],
    });
    let bookmarkMap = {};
    if ((user === null || user === void 0 ? void 0 : user.bookmarks) && user.bookmarks.length > 0) {
        user.bookmarks.forEach((bookmark) => {
            bookmarkMap[bookmark.id] = true;
        });
    }
    const result = keys.map((key) => {
        if (bookmarkMap[key.bookId]) {
            return true;
        }
        return false;
    });
    return result;
}));
exports.bookmarkStatusLoader = bookmarkStatusLoader;
//# sourceMappingURL=BookmarkStatusLoader.js.map