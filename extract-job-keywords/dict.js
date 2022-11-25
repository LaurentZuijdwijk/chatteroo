const fs = require('fs');

const { getWords } = require('./words');

function buildTermsDictionary(termsFile) {
    let termsDict = {};
    const file = fs.readFileSync(termsFile);
    const lines = file.toString().split('\n');
    lines.forEach((term) => {
        const words = getWords(term.trim());
        words.forEach((word) => {
            pushTermToDictionary(word, term, termsDict);
        });
    });
    return termsDict;
}

function pushTermToDictionary(keyword, searchTerm, termsDict) {
    keyword = keyword.toLowerCase();
    if (termsDict[keyword]) {
        termsDict[keyword].push(searchTerm);
    } else {
        termsDict[keyword] = [searchTerm];
    }
}

function buildEnglishDictionary(dictFile) {
    let dict = {};
    const file = fs.readFileSync(dictFile);

    const lines = file.toString().split('\n');
    for (let i = 0; i < lines.length; i++) {
        dict[lines[i].trim().toLowerCase()] = true;
    }

    return dict;
}

module.exports = { buildEnglishDictionary, buildTermsDictionary };
