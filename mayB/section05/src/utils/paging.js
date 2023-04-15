// export const getSkipTake = (page, limit) => {
//   const page = page ?? "1";
//   const limit = limit ?? "20";
//   const take = Number(limit) || 20;
//   const skip = (Number(page) - 1) * take;
//   return {
//     skip,
//     take,
//   };
// };

// 미들웨어로 넘겨서 사용함 / middleware / pagination
