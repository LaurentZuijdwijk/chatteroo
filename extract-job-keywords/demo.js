const extract = require('./extract');

const message = 'I am looking for a job as a software engineer in London for 45k.';

const keywordTerms = extract.extractKeywords(message);
const locationTerms = extract.extractLocations(message);
const bestMatchKeyword = extract.getBestMatch(keywordTerms);
const bestMatchLocation = extract.getBestMatch(locationTerms);
const salary = extract.extractSalary(message);

console.log(`You are looking for a job as a ${bestMatchKeyword} in ${bestMatchLocation} for ${salary.period} ${salary.from}.`);
