export default function getBoard(state) {
    // Transform Immutable Map with Lists inside to Object with Arrays inside.
    const objState = state.board.toObject();
    return Object.keys(objState).reduce(function (final, rowIndex) {
        return {
            ...final,
            [rowIndex]: objState[rowIndex].toArray()
        };
    }, {});
}
