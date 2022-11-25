const { getWords } = require('./words');

function getBestThree(terms) {
    const topThree = [];
    for (let i = 0; i < 3; i++) {
        const best = getBestMatch(terms);
        topThree.push(best);
        terms = terms.filter((searchTerm) => {
            return searchTerm !== best;
        });
    }
    return topThree;
}

function getBestMatch(terms) {
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (hasMostWords(term, terms)) {
            return term;
        }
    }
    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (hasMostCharacters(term, terms)) {
            return term;
        }
    }
    return longestOrEqualLongest(terms); // tie breaker - should be rare
}

function hasMostWords(term, terms) {
    const thisNumWords = getWords(term).length;
    let otherMostNumWords = 0;
    for (let i = 0; i < terms.length; i++) {
        const otherTerm = terms[i];
        if (otherTerm === term) {
            continue;
        }
        const otherNumWords = getWords(otherTerm).length;
        if (otherNumWords > otherMostNumWords) {
            otherMostNumWords = otherNumWords;
        }
    }
    return thisNumWords > otherMostNumWords;
}

function hasMostCharacters(term, terms) {
    const thisNumChars = term.length;
    let otherMostNumChars = 0;
    for (let i = 0; i < terms.length; i++) {
        const otherTerm = terms[i];
        if (otherTerm === term) {
            continue;
        }
        const otherNumChars = otherTerm.length;
        if (otherNumChars > otherMostNumChars) {
            otherMostNumChars = otherNumChars;
        }
    }
    return thisNumChars > otherMostNumChars;
}

function longestOrEqualLongest(terms) {
    let longest = '';

    for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        if (term.length > longest.length) {
            longest = term;
        }
    }
    return longest;
}

module.exports = { getBestMatch, getBestThree };
