import { checkStringListEquality } from './checkStringListEquailty';

describe('Checking String List Equality', () => {
    test('Valid String list', () => {
        const list1 = ['a', 'b'];
        const list2 = ['a', 'b'];
        expect(checkStringListEquality(list1, list2)).toBe(true);
    });
    test('Different Length Lists', () => {
        const list1 = ['a', 'b'];
        const list2 = ['c'];
        expect(checkStringListEquality(list1, list2)).toBe(false);
    });
    test('Same Length Different Ordering', () => {
        const list1 = ['a', 'b'];
        const list2 = ['b', 'c'];
        expect(checkStringListEquality(list1, list2)).toBe(false);
    });
    test('Same Length Different elements', () => {
        const list1 = ['a', 'b'];
        const list2 = ['x', 'k'];
        expect(checkStringListEquality(list1, list2)).toBe(false);
    });
    test('Same List', () => {
        const list1 = ['a', 'b'];
        expect(checkStringListEquality(list1, list1)).toBe(true);
    });
    test('Reference to Same List', () => {
        const list1 = ['a', 'b'];
        const list2 = list1;
        expect(checkStringListEquality(list1, list2)).toBe(true);
    });
});
