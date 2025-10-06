function sum(a, b){
    return a + b;
}

function div(a, b){
    return a / b;
}

function containsNumbers(text){
    for (let i = 0; i < text.length; i++) {
        if (text.trim().length === 0) {
            return false;
        }
        if (!isNaN(text.charAt(i)))
            return true;
    }
    return false;
}

// export functions
exports.sum = sum;
exports.div = div;
exports.containsNumbers = containsNumbers;