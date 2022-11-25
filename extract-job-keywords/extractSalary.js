const { getWords } = require('./words');

function extractSalary(message) {
    const normalisedMessage = getMessageWithCommonSalaryMistakesFixed(message);
    const protectedMessage = getMessageWithPeriodsBetweenNumbers(normalisedMessage);

    const fragment = getSalaryFragment(protectedMessage);
    let salary = extractSalaryFromString(fragment);

    if (salary.from > 0) return salary;

    salary = extractSalaryFromString(protectedMessage);

    return salary;
}

function getMessageWithPeriodsBetweenNumbers(message) {
    return message.replace(/([0-9]+)[, ]([0-9]+)/g, '$1.$2');
}

function extractSalaryFromString(string) {
    let salary = { from: null, to: null, period: null };

    let fromRaw = getFromRaw(string);
    let toRaw = getToRaw(string);

    const multiplier = getSizeMultiplier(string);

    salary.from = getSalaryNormalised(fromRaw, multiplier);
    salary.to = getSalaryNormalised(toRaw, multiplier);

    salary.period = getPeriod(salary.from);

    return salary;
}

function getSalaryFragment(message) {
    const words = getWords(message);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();

        if (word === 'gbp') return buildFragment(words, i);
        if (word.includes('£')) return buildFragment(words, i);

        if (word === 'hourly') return buildPreFragment(words, i);
        if (word === 'hour') return buildPreFragment(words, i);
        if (word === 'hr') return buildPreFragment(words, i);
        if (word === 'h') return buildPreFragment(words, i);
        if (word === 'ph') return buildPreFragment(words, i);
        if (word === 'daily') return buildPreFragment(words, i);
        if (word === 'd') return buildPreFragment(words, i);
        if (word === 'pd') return buildPreFragment(words, i);
        if (word === 'per') return buildPreFragment(words, i);
        if (word === 'annum') return buildPreFragment(words, i);
        if (word.match(/\b[0-9]*k\b/)) return buildPreFragment(words, i);
    }
    return '';
}

function buildFragment(words, i) {
    let fragment = '';

    fragment += getWord(words, i - 2);
    fragment += getWord(words, i - 1);
    fragment += getWord(words, i);
    fragment += getWord(words, i + 1);
    fragment += getWord(words, i + 2);

    return fragment;
}

function buildPreFragment(words, i) {
    let fragment = '';
    const maxNumbers = 2;
    const maxWords = 6;

    let numbersCount = 0;
    let wordsCount = 0;

    for (let j = i - 1; j >= 0 && numbersCount < maxNumbers && wordsCount < maxWords; j--) {
        const word = words[j].toLowerCase();
        if (word.match(/^[0-9]+$/)) numbersCount++;

        wordsCount++;
        fragment = word + ' ' + fragment;
    }

    fragment += getWord(words, i);

    if (numbersCount < 2) {
        fragment += getWord(words, i + 1);
        fragment += getWord(words, i + 2);
    }

    return fragment;
}

function getWord(words, i) {
    if (words[i]) return `${words[i]} `;
    return '';
}

function getFromRaw(message) {
    let fromRaw = getSalaryMatches(message);
    if (fromRaw[0] && fromRaw[0][0]) return getNumberFromString(fromRaw[0][0]);
    return 0;
}

function getToRaw(message) {
    let toRaw = getSalaryMatches(message);
    if (toRaw[1] && toRaw[1][0]) return getNumberFromString(toRaw[1][0]);
    return 0;
}

function getSalaryMatches(message) {
    return [...message.matchAll(/\b([0-9]+[,._]*[0-9]*)/g)];
}

function getNumberFromString(string) {
    return parseInt(string.replace(/[^0-9]/g, ''));
}

function getSizeMultiplier(message) {
    const words = getWords(message);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        if (word.match(/\b[0-9]*k\b/)) return 1000;
        if (word === 'thousand') return 1000;
        if (word === 'annum') return 1000;
    }
    return 1;
}

function getSalaryNormalised(salary, multiplier) {
    let normlised = salary * multiplier;
    if (normlised > 200000) return salary;
    return normlised;
}

function getPeriod(from) {
    if (from > 1000) return 'annual';
    if (from > 80) return 'daily';
    if (from > 5) return 'hourly';
    return null;
}

function getMessageWithCommonSalaryMistakesFixed(message) {
    return message.replace(/\banum\b/g, 'annum');
}

module.exports = { extractSalary };
