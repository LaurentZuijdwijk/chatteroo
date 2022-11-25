# extract-job-keywords

Extract job search related keywords from a message

## Installation

```sh
npm install
```

## Running the unit tests

```sh
npm test
```

## Using the extractor

Import the extractor

```js
const extract = require('./extract');
```

First extract all matching keywords as an array, or all matching locations as an array

```js
const terms = extract.extractKeywords(message);
const terms = extract.extractLocations(message);
```

Then extract the best match as a string

```js
const bestMatch = extract.getBestMatch(terms);
```

Or extract the best 3 matches as an array

```js
const bestThree = extract.getBestThree(terms);
```

To extract a salary

```js
const salary = extract.extractSalary('Am 25 graduated 32 days ago and around 30- 45 K Full time Desired');
```

You will get an object looking like

```js
{ from: 30000, to: 45000, period: 'annual' }
```

If no `to` value can be found, it will be 0.
If no `from` value can be found, it and `to` will be 0 and the period will be null.

## Reference termsDict

A fragment of the termsDict looks like this

```js
{
    javascript: ['JavaScript Developer', 'Frontend Javascript Developer', 'Full Stack JavaScript Developer'];
}
```

The key is always in lowercase, and the value is an array of all phrases containing that keyword.

## Reference Special characters used in search terms

```txt
42:& Audit & Accounts Senior
23:+ C++, Class 1 C+E Driver
#20: Developer .Net C#,
.30: 3.5 Ton Driver, I.T. Support Specialist, Node.Js Developer, VB. Net Developer
```

Numbers

```txt
Year 1 Teacher, Iso 9001 Internal Auditor, Junior 1st Line Support
```

## Reference englishDict

Each key is an English word we know.

```js
{
    apply: true;
}
```

`English30000.txt` contains a list of the top 30000 English words by frequency of use.
