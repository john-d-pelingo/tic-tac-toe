// export const WINNING_LAYOUTS = [
//   [0, 1, 2], // 1st row.
//   [3, 4, 5], // 2nd row.
//   [6, 7, 8], // 3rd row.
//   [0, 3, 6], // 1st column.
//   [1, 4, 7], // 2nd column.
//   [2, 5, 8], // 3rd column.
//   [0, 4, 8], // backslash.
//   [2, 4, 6]  // front slash.
// ];

export const WINNING_LAYOUTS = {
  '1r': [0, 1, 2], // 1st row.
  '2r': [3, 4, 5], // 2nd row.
  '3r': [6, 7, 8], // 3rd row.
  '1c': [0, 3, 6], // 1st column.
  '2c': [1, 4, 7], // 2nd column.
  '3c': [2, 5, 8], // 3rd column.
  'bs': [0, 4, 8], // backslash.
  'fs': [2, 4, 6]  // front slash.
};
export const WINNING_LAYOUTS_KEYS = Object.keys(WINNING_LAYOUTS);
export const WINNING_LAYOUTS_LENGTH = Object.keys(WINNING_LAYOUTS).length;
