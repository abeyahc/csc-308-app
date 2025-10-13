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

test('sale subtracts shares from an existing symbol', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 10 };
    p.sale('RBLX', 4);
    expect(p.holdings).toEqual({ RBLX: 6 });
  });
  
  test('sale removes symbol when shares drop to zero', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 5 };
    p.sale('RBLX', 5);
    expect(p.holdings).toEqual({});
  });
  
  test('sale is case-insensitive for symbol', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 7 };
    p.sale('rblx', 2);
    expect(p.holdings).toEqual({ RBLX: 5 });
  });
  
  test('sale throws when selling more than owned (oversell)', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 3 };
    expect(() => p.sale('RBLX', 4)).toThrow('Not possible to sell this number of shares.');
    expect(p.holdings).toEqual({ RBLX: 3 });
  });
  
  test("sale throws when symbol isn't owned", () => {
    const p = new Portfolio();
    p.holdings = { AAPL: 2 };
    expect(() => p.sale('RBLX', 1)).toThrow("You do not own any of this share");
    expect(p.holdings).toEqual({ AAPL: 2 });
  });
  
  test('sale throws on invalid shares (<= 0)', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 5 };
    expect(() => p.sale('RBLX', 0)).toThrow('Invalid');
    expect(() => p.sale('RBLX', -1)).toThrow('Invalid');
    // unchanged
    expect(p.holdings).toEqual({ RBLX: 5 });
  });
  
  test('sale throws on invalid/blank symbol', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 5 };
    expect(() => p.sale('', 1)).toThrow('Invalid');
    expect(() => p.sale('   ', 1)).toThrow('Invalid');
    expect(p.holdings).toEqual({ RBLX: 5 });
  });
  
  test('sequence: buy then sale updates correctly and removes at zero', () => {
    const p = new Portfolio();
    p.buy('RBLX', 3);
    p.buy('RBLX', 2);
    p.sale('RBLX', 1); 
    expect(p.holdings).toEqual({ RBLX: 4 });
    p.sale('RBLX', 4);      
    expect(p.holdings).toEqual({});
  });
  
  test('multiple symbols: sale only affects the targeted one', () => {
    const p = new Portfolio();
    p.holdings = { RBLX: 5, AAPL: 10 };
    p.sale('AAPL', 3);
    expect(p.holdings).toEqual({ RBLX: 5, AAPL: 7 });
  });
  
  test('Check if count works -- success', () => {
    const p = new Portfolio();
    const target = 0
    const result = p.count()
    expect(result).toEqual(target)
  })

  test('Check if count works -- success', () => {
    const p = new Portfolio();
    p.holdings = {"YES": 1}
    const target = 1
    const result = p.count()
    expect(result).toEqual(target)
  })

  test('Check if count works with two companies -- success', () => {
    const p = new Portfolio();
    p.holdings = {"YES": 10, "HBS": 3}
    const target = 2
    const result = p.count()
    expect(result).toEqual(target)
  })

  test('Check if stock has 0 shares if not fail -- success', () => {
    const p = new Portfolio();
    p.holdings = {"YES": 10, "HBS": 3}
    const target = 2
    const result = p.count()
    expect(result).toEqual(target)
  })

  test('sharesOf returns 0 for unknown symbol', () => {
    const p = new Portfolio();
    expect(p.sharesOf('AAPL')).toBe(0);
  });
  
  test('sharesOf returns the correct count for existing symbol', () => {
    const p = new Portfolio();
    p.buy('RBLX', 5);
    expect(p.sharesOf('RBLX')).toBe(5);
  });
  
  test('sharesOf handles whitespace and case-insensitive symbols', () => {
    const p = new Portfolio();
    p.buy('rblx', 3);
    expect(p.sharesOf('  RBLX  ')).toBe(3);
  });
  