const { getWords } = require('./words');

function extractTerms(message, englishDict, termsDict) {
    const searchTerms = [];
    const words = getWords(message, englishDict, termsDict, true);
    let messageWordIndex = -1;
    words.forEach((word) => {
        messageWordIndex++;
        if (word in termsDict) {
            termsDict[word].forEach((searchTerm) => {
                const termWords = getWords(searchTerm);
                let termIndex = -1;
                let found = true;
                for (let i = 0; i < termWords.length; i++) {
                    termIndex++;
                    termWord = termWords[i].toLowerCase();
                    if (messageWordIndex + termIndex > words.length - 1) {
                        found = false;
                        break;
                    }
                    if (termWord !== words[messageWordIndex + termIndex].toLowerCase()) {
                        found = false;
                    }
                }
                if (found) {
                    searchTerms.push(searchTerm);
                }
            });
        }
    });
    return searchTerms;
}

module.exports = { extractTerms };
