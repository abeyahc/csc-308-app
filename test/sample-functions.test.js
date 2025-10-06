const myFunctions = require('./sample-functions.js');

//Setup functions
beforeEach( () => {

});

beforeAll( () => {

});

// //Teardown functions
afterEach( () => {

});

afterAll( () => {

});

// test( 'Describe your test case', () => {

// });

test('Testing sum with zero -- success', () => {
    const target = 30;
    const result = myFunctions.sum(30, 0);
    expect(result).toBe(target);
});

test('Testing sum -- success', () => {
    const target = 30;
    const result = myFunctions.sum(12, 18);
    expect(result).toBe(target);
});

test('Testing sum negative numbers -- success', () => {
    const target = -30;
    const result = myFunctions.sum(-12, -18);
    expect(result).toBe(target);
});

test('Testing div numbers with zero -- success', () => {
    const target = 0;
    const result = myFunctions.div(0, 30);
    expect(result).toBe(target);
})

test('Testing division -- success', () => {
    const target = 6;
    const result = myFunctions.div(30, 5);
    expect(result).toBe(target);
})

test('Testing division with negative -- success', () => {
    const target = -5;
    const result = myFunctions.div(-25, 5);
    expect(result).toBe(target);
})

test('Test contains numbers -- success', () => {
    const target = true;
    const result = myFunctions.containsNumbers("63dfs");
    expect(result).toBe(target);
})

test('Test does not contain numbers -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("ysesfask");
    expect(result).toBe(target);
})

test('Test empty string with whitespace -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers(" ");
    expect(result).toBe(target);
})

test('Test empty string -- success', () => {
    const target = false;
    const result = myFunctions.containsNumbers("");
    expect(result).toBe(target);
})