/**
 * checkStringListEquality
 * checks if two string lists contain exactly the same elements
 *
 * ["a", "b"], ["b", "a"] true,
 * ["x", "c"], ["b", "a"] false
 * ["a"], ["a", "b"] false
 * @param a first list of strings
 * @param b second list of strings
 * @returns Equailty of the two lists
 */
export const checkStringListEquality = (
    a: Array<string>,
    b: Array<string>
): boolean => {
    return a.sort().join(',') === b.sort().join(',');
};
