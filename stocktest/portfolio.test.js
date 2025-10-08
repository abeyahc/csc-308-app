const Portfolio = require('./portfolio.js');

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

test('Testing if portfolio is empty -- success', () => {
    const p = new Portfolio();
    const target = true;
    const result = p.isEmpty();
    expect(result).toBe(target);
});

test('Testing if bought shares -- success', () => {
    const p = new Portfolio();
    p.buy("RBLX", 5);
    const target = {"RBLX": 5};
    const result = p.holdings;
    expect(result).toEqual(target);
});

test('Testing if bought shares to one that exists -- success', () => {
    const p = new Portfolio();
    p.holdings = {"RBLX": 5}
    p.buy("RBLX", 5);
    const target = {"RBLX": 10};
    const result = p.holdings;
    expect(result).toEqual(target);
});

test('Testing fail for shares that are less than 0 -- success', () => {
    const p = new Portfolio();
    p.holdings = {"RBLX": 5}
    expect(() => p.buy('RBLX', -1)).toThrow('Invalid');
    const result = p.holdings; // Verify that it didn't change
    const target = { "RBLX": 5 };
    expect(result).toEqual(target);
});

test('Testing fail for a symbol that doesnt exist -- success', () => {
    const p = new Portfolio();
    expect(() => p.buy('', -1)).toThrow('Invalid');
    const result = p.holdings; // Verify that it didn't change
    const target = {};
    expect(result).toEqual(target);
});

test('Testing fail for a symbol that doesnt exist -- success', () => {
    const p = new Portfolio();
    expect(() => p.buy(' ', 0)).toThrow('Invalid');
    const result = p.holdings; // Verify that it didn't change
    const target = {};
    expect(result).toEqual(target);
});