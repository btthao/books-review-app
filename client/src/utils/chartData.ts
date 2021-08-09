import { Rating } from "../generated/graphql";

type chartReturn = {
  data: number[];
  voteStatus: number | null;
};

export const generateData = (
  array: Rating[] = [],
  userId: number = null
): chartReturn => {
  const data = new Array(5).fill(0);
  let voteStatus = null;

  for (const rate of array) {
    const value = rate.value;
    data[value - 1]++;
    if (userId && rate.userId == userId) {
      voteStatus = rate.value;
    }
  }

  return { data: data.reverse(), voteStatus };
};
