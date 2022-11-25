const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function getWords(text, englishDict = {}, termsDict = {}, shouldNormalise = false) {
    text = text.replace(/\.+ /g, ' '); // I want to be a teacher. Or a librarian
    text = text.replace(/\.+$/g, ''); // I want to be a teacher.
    let words = text.replace(/[^a-zA-Z0-9\s&+#.£]/g, ' ').split(' '); // & + # . £ are the only special characters
    words = words.filter((word) => {
        return word !== '';
    });

    if (shouldNormalise) return normalise(words, englishDict, termsDict);

    return words;
}

function normalise(words, englishDict, termsDict) {
    const newWords = [];
    words.forEach((word) => {
        newWords.push(normaliseWord(word, englishDict, termsDict));
    });
    return newWords;
}

function normaliseWord(word, englishDict, termsDict) {
    word = word.toLowerCase();

    if (word in termsDict) return word;

    const singular = tryMakingWordSingular(word, termsDict);
    if (singular) return singular;

    if (word in englishDict) return word;

    const removed = tryRemovingOneChar(word, termsDict);
    if (removed) return removed;

    const added = tryAddingOneChar(word, termsDict);
    if (added) return added;

    const replaced = tryReplacingOneChar(word, termsDict);
    if (replaced) return replaced;

    return word;
}

function tryMakingWordSingular(word, termsDict) {
    if (word.endsWith('s')) {
        const singular = word.slice(0, -1);
        if (singular in termsDict) return singular;
    }
    return null;
}

function tryRemovingOneChar(word, termsDict) {
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const mutation = word.replace(char, '');
        if (mutation in termsDict) return mutation;
    }
    return null;
}

function tryAddingOneChar(word, termsDict) {
    for (let i = 0; i < word.length + 1; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            const char = alphabet[j];
            const mutation = word.slice(0, i) + char + word.slice(i);
            if (mutation in termsDict) return mutation;
        }
    }
    return null;
}

function tryReplacingOneChar(word, termsDict) {
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            const char = alphabet[j];
            const mutation = word.slice(0, i) + char + word.slice(i + 1);
            if (mutation in termsDict) return mutation;
        }
    }
    return null;
}

module.exports = { getWords };
