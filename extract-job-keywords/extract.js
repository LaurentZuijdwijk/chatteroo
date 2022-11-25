const { buildTermsDictionary, buildEnglishDictionary } = require('./dict');
const { extractSalary } = require('./extractSalary');
const { extractTerms } = require('./extractTerms');
const { getBestMatch, getBestThree } = require('./best');

let keywordsDict = buildTermsDictionary(__dirname+'/keywords.txt');
let locationsDict = buildTermsDictionary(__dirname+'/locations.txt');
let englishDict = buildEnglishDictionary(__dirname+'/English30000.txt');

function extractKeywords(message) {
    return extractTerms(message, englishDict, keywordsDict);
}

function extractLocations(message) {
    return extractTerms(message, englishDict, locationsDict);
}

module.exports = {
    extractKeywords,
    extractLocations,
    extractSalary,
    getBestMatch,
    getBestThree,
    keywordsDict,
    locationsDict,
};
