const extract = require('./extract');

const keywordsDict = extract.keywordsDict;

test('should build a keywords dictionary lookup object', () => {
    expect(keywordsDict).toBeDefined();
});

test('should have a root keyword for javascript', () => {
    expect(keywordsDict.javascript).toBeDefined();
});

test('should have a search term of JavaScript Developer under javascript', () => {
    expect(keywordsDict.javascript.includes('JavaScript Developer')).toBeTruthy();
});

test('should have a search term of Junior Javascript Developer under javascript', () => {
    expect(keywordsDict.javascript.includes('Junior Javascript Developer')).toBeTruthy();
});

let foundTerms = [
    {
        message: 'I am looking for a job as a JavaScript Developer in London',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer',
        term: 'JavaScript Developer',
    },
    {
        message: '   javascript       developer    ',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer....',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer, London',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer?',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer!!!',
        term: 'JavaScript Developer',
    },
    {
        message: 'I dunno, maybe JavaScript Developer',
        term: 'JavaScript Developer',
    },
    {
        message: 'I am looking for a job as a JavaScript Developer',
        term: 'JavaScript Developer',
    },
    {
        message: 'JavaScript Developer is my dream job',
        term: 'JavaScript Developer',
    },
    {
        message: 'I am writing javascript developer in lower case',
        term: 'JavaScript Developer',
    },
    {
        message: 'I am writing javascript developer in lower case',
        term: 'Writing',
    },
    {
        message: 'I am writing javascript developer in lower case',
        term: 'Javascript',
    },
    {
        message: 'I want to be a technical writer or a javascript developer',
        term: 'Technical Writer',
    },
    {
        message: 'Need to handle comma after javascript developer, else it will not be found',
        term: 'JavaScript Developer',
    },
    {
        message: 'I am working as a Audit & Accounts Senior in Bristol.',
        term: 'Audit & Accounts Senior',
    },
    {
        message: 'I am a Class 1 C+E Driver but am studying C++ at night',
        term: 'Class 1 C+E Driver',
    },
    {
        message: 'I am a Class 1 C+E Driver but am studying C++ at night',
        term: 'C++',
    },
    {
        message: '3.5 Ton Driver at the moment, but I aspire to be a Node.js Developer',
        term: '3.5 Ton Driver',
    },
    {
        message: '3.5 Ton Driver at the moment, but I aspire to be a node.js Developer',
        term: 'Node.Js Developer',
    },
    {
        message: 'I studied .NET at the University of Bristol so am looking for roles as Junior .Net Developer',
        term: 'Junior .Net Developer',
    },
    {
        message: 'I am a I.T. Support Specialist by day but a dance teacher at night',
        term: 'Dance Teacher',
    },
    {
        message: 'I am a I.T. Support Specialist by day but a dance teacher at night',
        term: 'I.T. Support Specialist',
    },
    {
        message: 'Am a Junior 1st Line Support Specialist and also a Year 1 teacher.',
        term: 'Junior 1st Line Support',
    },
    {
        message: 'Am a Junior 1st Line Support Specialist and also a Year 1 teacher.',
        term: 'Year 1 Teacher',
    },
    {
        message: 'Fully trained as a Iso 9001 Internal Auditor, Director of Insurance and a Director of Operations',
        term: 'Iso 9001 Internal Auditor',
    },
    {
        message: 'Willing to relocate so long as I land a role as a C# Software Engineer',
        term: 'C# Software Engineer',
    },
    {
        message: 'Any jobs as a tractor mechanic?',
        term: 'Tractor Mechanic',
    },
    {
        message: 'I would really like to be a javascript developper',
        term: 'JavaScript Developer',
    },
    {
        message: 'I would really like to be a javascript develoer',
        term: 'JavaScript Developer',
    },
    {
        message: 'I would really like to be a avascript developer',
        term: 'JavaScript Developer',
    },
    {
        message: 'I would really like to be a javvascript developer',
        term: 'JavaScript Developer',
    },
    {
        message: 'I would really like to be a jaTascript developer',
        term: 'JavaScript Developer',
    },
];

foundTerms.forEach((element) => {
    test(`${element.message}:has:${element.term}`, () => {
        const terms = extract.extractKeywords(element.message);
        expect(terms).toContain(element.term);
    });
});

let bestMatches = [
    {
        message: 'I am writing javascript developer in lower case',
        bestMatch: 'JavaScript Developer',
    },
    {
        message: 'I want to be a technical writer or a javascript developer',
        bestMatch: 'JavaScript Developer',
    },
    {
        message:
            'I want to be a Technical Supervisor or a javascript developer, return first best match as tie breaker',
        bestMatch: 'Technical Supervisor',
    },
];

bestMatches.forEach((element) => {
    test(`${element.message}:best:${element.bestMatch}`, () => {
        const terms = extract.extractKeywords(element.message);
        const bestMatch = extract.getBestMatch(terms);
        expect(bestMatch).toBe(element.bestMatch);
    });
});

// top three matches
let bestThrees = [
    {
        message: 'Fully trained as a Iso 9001 Internal Auditor, Director of Insurance and a Director of Operations',
        bestThree: ['Iso 9001 Internal Auditor', 'Director Of Operations', 'Director of Insurance'],
    },
    {
        message: 'Am a Junior 1st Line Support Specialist and also a Year 1 teacher.',
        bestThree: ['Junior 1st Line Support', 'Support Specialist', '1st Line Support'],
    },
    {
        message: 'I want to be a Technical Supervisor or a javascript developer....',
        bestThree: ['Technical Supervisor', 'JavaScript Developer', 'Supervisor'],
    },
    {
        message:
            "real: Please I want to know how many hours a week Please And where is the post code I'm looking for cleaning jobs for morning shift Please can you send me the numbers please OK thanks have a nice day ",
        bestThree: ['Morning Shift', 'Cleaning', 'Shift'],
    },
    {
        message: 'real: Good mornining im trying to apply for the telehandler position ',
        bestThree: ['Telehandler', '', ''],
    },
    {
        message:
            'real: Good mornining im trying to apply for the telehandler position I.ve just pressed apply then im with you??? I.ve not at home im at work so no time. Would.nt it be easier just to talk to someone? Ok thanls',
        bestThree: ['Telehandler', 'IT', ''],
    },
    {
        message:
            'real: Finance jobs - Eg. Accountant, Assistant Accountant, Finance Manager, Assistant Finance Manager, etc Location - Orpington, Bromley Salary any amount - Eg. 25,000 and above,',
        bestThree: ['Assistant Finance Manager', 'Accountant Assistant', 'Assistant Accountant'],
    },
    {
        message:
            'real: I am interested in the job, werehouse Operative. Dunstable Lu5 down was. I like night shift from £13 going. Full time and overtime Okay 👍',
        bestThree: ['Warehouse Operative', 'Night Shift', 'Full Time'],
    },
    {
        message: 'real: What are the rates for mental health nurses?',
        bestThree: ['Mental Health', 'Health', ''],
    },
    {
        message: 'What are the rates for dental therapists?',
        bestThree: ['Dental Therapist', 'Therapist', 'Dental'],
    },
    {
        message: 'real: New or junior barrister or solicitor Locations london or around 30- 45 K Full time Desired',
        bestThree: ['Full Time', 'Barrister', 'Solicitor'],
    },
    {
        message:
            'real: I looking for a Werehouse job in Chatham or in kent area Yes I have sent my cv my name is Redacted Redacted Sorry it for Werehouse wor',
        bestThree: ['Warehouse', 'IT', ''],
    },
    {
        message:
            'real: Can you col me please Can I call you?? Hi I looking for per time job thanks I living Woolwich and I lucking Greenwich please',
        bestThree: ['', '', ''],
    },
    {
        message:
            'real: Hi,please i want to know how far with my application and when i can get job as a  live in career Yes Yesterday How do i get an account Or did i fill it the wrong way I added my email on my cv I have had a look at such job roles where you upload your CV with no Log in access',
        bestThree: ['Live In', 'Application', 'Account'],
    },
    {
        message:
            'real: hello im looking for a job in construction i have Npors cart for 10 tone 360 excavator but i can work as labour near Birmingham 12-13/h i work full time no thanks no thats all',
        bestThree: ['360 Excavator', 'Full Time', 'Construction'],
    },
    {
        message:
            'real: Hey karan . I am looking for part time job 20hrs per week i have earlier worked as health care assistant Wolverhampton Any part time role',
        bestThree: ['Care Assistant', 'Part Time', 'Assistant'],
    },
    {
        message:
            'real: I want to apply order picker/packer/warehouse operative Order picker/packer, I want to nearest my home, that means BS32 Bradley Stoke, I want to earn GBP 10 or above. I prefer to work on weekdays, that means Monday to Friday. First priority I prefer to work part time. Thanks again I found a really good job here but it is 4 on 4 offgood pay',
        bestThree: ['Order Picker Packer', 'Monday To Friday', 'Warehouse Operative'],
    },
    {
        message: 'real: NIGHT SHIFT JOBS IN STUDLEY, REDDITCH PERMENANT . OK THANKS OB PM SHIFT AFTER 20.00 TO7.30 AM ',
        bestThree: ['Night Shift', 'Night', 'Shift'],
    },
    {
        message:
            'real: Yes dear I am MBA marketing looking for job Any part time job Job title. Any location. Manchester salary expectations not specifically or looking for part time I am much needed yes? I have 5 years experience in real estate Real estate marketing',
        bestThree: ['Real Estate', 'Marketing', 'Part Time'],
    },
    {
        message:
            "real: I am yes I'm sorry if I don't reply, I'm currently at work myself and I might get called out to do something last second 😊 I'm looking at engineering/maintenance roles Preferably in East Midlands (closer to the airport the better) I work full time. I currently in the Royal Navy, I have my years notice in (leaving in January officially) however If I get a good job offer in writing I can apply for early termination. I'm* Yes can I get them by email please No that's everything, thank you",
        bestThree: ['Full Time', 'Engineering', 'Maintenance'],
    },
    {
        message: 'real: I am looking for a job as a support worker or care assistant',
        bestThree: ['Support Worker', 'Care Assistant', 'Assistant'],
    },
];

bestThrees.forEach((element) => {
    test(`${element.message}:top3:${element.bestThree}`, () => {
        const terms = extract.extractKeywords(element.message);
        const bestThree = extract.getBestThree(terms);
        expect(bestThree).toEqual(element.bestThree);
    });
});
