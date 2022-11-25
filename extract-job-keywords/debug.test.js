const extract = require('./extract');

// top three matches

test('test-to-debug', () => {
    const message = 'What are the rates for dental therapists?';
    const expectedBestThree = ['Dental Therapist', 'Therapist', 'Dental'];
    const searchTerms = extract.extractKeywords(message);
    const bestThree = extract.getBestThree(searchTerms);
    expect(bestThree).toEqual(expectedBestThree);
});
