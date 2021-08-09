import DataLoader from "dataloader";
import { User } from "../entities/User";

type Input = {
  bookId: number;
  userId: number;
};

// done
export const bookmarkStatusLoader = () =>
  new DataLoader<Input, boolean | null>(async (keys) => {
    const user = await User.findOne(keys[0].userId, {
      relations: ["bookmarks"],
    });

    let bookmarkMap: Record<string, boolean> = {};

    if (user?.bookmarks && user.bookmarks.length > 0) {
      user.bookmarks.forEach((bookmark) => {
        bookmarkMap[bookmark.id] = true;
      });
    }

    const result = keys.map((key: Input) => {
      if (bookmarkMap[key.bookId]) {
        return true;
      }
      return false;
    });

    return result;
  });
