// takes source array, and two indices that it will swap
// use generic type T for arrays with any kind of items
export const moveItem = <T>(array: T[], from: number, to: number) => {
    // make sure it's always a positive number
    const startIndex = to < 0 ? array.length + to : to;
    // no negative number passed to splice
    // so it's not added to end (wrong spot)
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
    return array;
};