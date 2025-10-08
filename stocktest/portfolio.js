class Portfolio {
    constructor() {
        this.holdings = {}
    }

    isEmpty() {
        return Object.keys(this.holdings).length === 0;
    }

    buy(symbol, shares) {
        if (!symbol || shares <= 0) {
            throw new Error("Invalid");
        }

        const key = symbol.trim().toUpperCase();

        if (this.holdings[key]) {
            this.holdings[key] += shares;
        }
        else {
            this.holdings[key] = shares;
        }
    }
    
    sale(symbol, shares) {
        const key = symbol ? symbol.trim().toUpperCase() : "";

        if (!key || shares <= 0) {
            throw new Error("Invalid");
        }

        if (!this.holdings[key]) {
            throw new Error("You do not own any of this share");
        }

        if (this.holdings[key] < shares) {
            throw new Error("Not possible to sell this number of shares.");
        }

        if (this.holdings[key]) {
            this.holdings[key] -= shares;
        }
        else {
            this.holdings[key] 
        }

        if (this.holdings[key] === 0) {
            delete this.holdings[key];
        }
    }

    count() {
        const count_keys = Object.keys(this.holdings).length;
        return count_keys
    }

    sharesOf(symbol) {
        const key = symbol ? symbol.trim().toUpperCase() : "";
        if (!key || !(key in this.holdings)) {
            return 0
        }
        const count_shares = this.holdings[key]
        return count_shares
    }
}

/* Testing with the TDD was useful, I was able to catch mistakes and debug lots of my code along the way.
TDD Practice was useful for being able to catch edge-cases and being able to refine my code to cause less bugs.
*/

module.exports = Portfolio;