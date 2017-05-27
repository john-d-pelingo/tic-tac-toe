export function getBoard(state) {
  return state.board;
}
export function getBoardAsObjAndArr(state) {
  // Transform Immutable Map with Lists inside to Object with Arrays inside.
  const boardObj = getBoard(state).toObject();
  return Object.keys(boardObj).reduce(function (final, rowIndex) {
    return {
      ...final,
      [rowIndex]: boardObj[rowIndex].toArray()
    };
  }, {});
}

export function getLongBoard(state) {
  const boardAsObjAndArr = getBoardAsObjAndArr(state);
  return Object.keys(boardAsObjAndArr).reduce(function (partialBoard, rowIndex) {
    return [
      ...partialBoard,
      ...boardAsObjAndArr[rowIndex]
    ];
  }, []);
}
