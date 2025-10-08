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
}

module.exports = Portfolio;