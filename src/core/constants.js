export const BOARD_SIZE = 9;

export const CROSS = 'X';
export const NOUGHT = 'O';

export const WINNING_LAYOUTS = [
    [0, 1, 2], // 1st row.
    [3, 4, 5], // 2nd row.
    [6, 7, 8], // 3rd row.
    [0, 3, 6], // 1st column.
    [1, 4, 7], // 2nd column.
    [2, 5, 8], // 3rd column.
    [0, 4, 8], // 1st slanting.
    [2, 4, 6]  // 2nd slanting.
];
