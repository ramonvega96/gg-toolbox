import { success, failure } from './Result';

test('Should return expected Result wrapper object', () => {
    const payload = { a: 1, b: '1', c: { d: { e: '1234' } } };

    const cases = [
        [success(payload), { success: true, payload }],
        [
            success(payload, 'message'),
            { success: true, payload, message: 'message' },
        ],
        [
            failure(undefined, new Error('Error')),
            { success: false, error: new Error('Error') },
        ],
        [
            failure('message', new Error('Error')),
            { success: false, message: 'message' },
        ],
        [success(), { success: true }],
        [failure(), { success: false }],
    ];

    cases.forEach((testCase) => {
        expect(testCase[0]).toMatchObject(testCase[1]);
    });
});
