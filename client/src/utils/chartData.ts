export const generateData = (array: any[] = [], userId: number = null) => {
  // console.log(array);
  // console.log(userId);
  let data = new Array(5).fill(0);
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
