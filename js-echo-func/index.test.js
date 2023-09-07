const { handler } = require("./index");

describe('index unit tests', () =>
{
    test('returns 200', async () => {
        const message = "test message";
        const test_event = {body: `{"echo": "${message}"}`};
        const result = await handler(test_event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(`Echo is: ${message}`);
    });
});
