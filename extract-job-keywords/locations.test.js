const extract = require('./extract');

const locationsDict = extract.locationsDict;

test('should build a locations dictionary lookup object', () => {
    expect(locationsDict).toBeDefined();
});

test('should have a root keyword for london', () => {
    expect(locationsDict.london).toBeDefined();
});

test('should have a locaiton of London Bridge under london', () => {
    expect(locationsDict.london.includes('London Bridge')).toBeTruthy();
});

let foundTerms = [
    {
        message: 'I am looking for a job as a JavaScript Developer in London Bridge',
        term: 'London Bridge',
    },
];

foundTerms.forEach((element) => {
    test(`${element.message}:has:${element.term}`, () => {
        const locations = extract.extractLocations(element.message);
        expect(locations).toContain(element.term);
    });
});

let bestMatches = [
    {
        message: 'I live near Abbess Beauchamp and Berners Roding, do you know it?',
        bestMatch: 'Abbess Beauchamp and Berners Roding',
    },
    {
        message: 'I am not that far from Sandford-on-Thames, is that correct?',
        bestMatch: 'Sandford-on-Thames',
    },
    {
        message: 'Looking for jobs within 5 miles of Sandford St. Martin',
        bestMatch: 'Sandford St. Martin',
    },
    {
        message: 'Looking for jobs within 5 miles of Sandford St Martin',
        bestMatch: 'Sandford St. Martin',
    },
    {
        message: "Driver jobs in Sankyn's Green",
        bestMatch: "Sankyn's Green",
    },
    {
        message: 'I live at Seaton, North',
        bestMatch: 'Seaton, North',
    },
    {
        message: 'Very close to Shear Brow & Corporation Park',
        bestMatch: 'Shear Brow & Corporation Park',
    },
    {
        message: 'Nearby Aberdare West/Llwydcoed',
        bestMatch: 'Aberdare West/Llwydcoed',
    },
    {
        message: 'Aberdour (Fife) or close by please',
        bestMatch: 'Aberdour (Fife)',
    },
    {
        message: 'Aberdour Fife or close by please',
        bestMatch: 'Aberdour (Fife)',
    },
    {
        message: 'Aberdour - Fife or close by please',
        bestMatch: 'Aberdour (Fife)',
    },
];

bestMatches.forEach((element) => {
    test(`${element.message}:best:${element.bestMatch}`, () => {
        const terms = extract.extractLocations(element.message);
        const bestMatch = extract.getBestMatch(terms);
        expect(bestMatch).toBe(element.bestMatch);
    });
});

let topThrees = [
    {
        message:
            'r: Finance jobs - Eg. Accountant, Assistant Accountant, Finance Manager, Assistant Finance Manager, etc Location - Orpington, Bromley Salary any amount - Eg. 25,000 and above,',
        topThree: ['Orpington', 'Bromley', ''],
    },
    {
        message:
            'r: I am interested in the job, werehouse Operative. Dunstable Lu5 down was. I like night shift from £13 going. Full time and overtime Okay 👍',
        topThree: ['Dunstable', 'Down', ''],
    },
    {
        message: 'r: New or junior barrister or solicitor Locations london or around 30- 45 K Full time Desired',
        topThree: ['Marrister', 'London', ''],
    },
    {
        message:
            'r: I looking for a Werehouse job in Chatham or in kent area Yes I have sent my cv my name is Redacted Redacted Sorry it for Werehouse wor',
        topThree: ['Chatham', 'Kent', ''],
    },
    {
        message:
            'r: Can you col me please Can I call you?? Hi I looking for per time job thanks I living Woolwich and I lucking Greenwich please',
        topThree: ['Greenwich', 'Woolwich', 'Col'],
    },
    {
        message:
            'r: hello im looking for a job in construction i have Npors cart for 10 tone 360 excavator but i can work as labour near Birmingham 12-13/h i work full time no thanks no thats all',
        topThree: ['Birmingham', 'Tone', ''],
    },
    {
        message:
            'r: Hey karan . I am looking for part time job 20hrs per week i have earlier worked as health care assistant Wolverhampton Any part time role',
        topThree: ['Wolverhampton', 'Week', 'Hey'],
    },
    {
        message:
            'r: I want to apply order picker/packer/warehouse operative Order picker/packer, I want to nearest my home, that means BS32 Bradley Stoke, I want to earn GBP 10 or above. I prefer to work on weekdays, that means Monday to Friday. First priority I prefer to work part time. Thanks again I found a really good job here but it is 4 on 4 offgood pay',
        topThree: ['Bradley Stoke', 'Bradley', 'Stoke'],
    },
    {
        message: 'r: NIGHT SHIFT JOBS IN STUDLEY, REDDITCH PERMENANT . OK THANKS OB PM SHIFT AFTER 20.00 TO7.30 AM ',
        topThree: ['Redditch', 'Studley', ''],
    },
    {
        message:
            'r: Yes dear I am MBA marketing looking for job Any part time job Job title. Any location. Manchester salary expectations not specifically or looking for part time I am much needed yes? I have 5 years experience in real estate Real estate marketing',
        topThree: ['Manchester', 'Real', ''],
    },
    {
        message:
            "r: I am yes I'm sorry if I don't reply, I'm currently at work myself and I might get called out to do something last second 😊 I'm looking at engineering/maintenance roles Preferably in East Midlands (closer to the airport the better) I work full time. I currently in the Royal Navy, I have my years notice in (leaving in January officially) however If I get a good job offer in writing I can apply for early termination. I'm* Yes can I get them by email please No that's everything, thank you",
        topThree: ['East Midlands', 'East', ''],
    },
];

topThrees.forEach((element) => {
    test(`${element.message}:top3:${element.topThree}`, () => {
        const terms = extract.extractLocations(element.message);
        const topThree = extract.getBestThree(terms);
        expect(topThree).toEqual(element.topThree);
    });
});
