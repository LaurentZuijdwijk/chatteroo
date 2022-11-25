const extract = require('./extract');

// period: annual, daily, hourly

let salaries = [
    {
        message: 'No salary stated',
        salary: { from: 0, to: 0, period: null },
    },
    {
        message: 'any salary, say of 25,000 or more up to 35,000 per annum',
        salary: { from: 25000, to: 35000, period: 'annual' },
    },
    {
        message: 'Happy to negotiate. 25.000 or more up to 35.000 per annum',
        salary: { from: 25000, to: 35000, period: 'annual' },
    },
    {
        message: 'Happy to negotiate. 25 000 or more up to 35 000 per annum',
        salary: { from: 25000, to: 35000, period: 'annual' },
    },
    {
        message: 'I am 25 years old and want to earn 35 hourly',
        salary: { from: 35, to: 0, period: 'hourly' },
    },
    {
        message: 'I am 25 years old and want to earn 35/hour',
        salary: { from: 35, to: 0, period: 'hourly' },
    },
    {
        message: 'I am 25 years old and want to earn 35/hr',
        salary: { from: 35, to: 0, period: 'hourly' },
    },
    {
        message: 'I am 25 years old and want to earn 35 per hour',
        salary: { from: 35, to: 0, period: 'hourly' },
    },
    {
        message: 'I am 25 years old and want to earn 35000 to 45000 per annum',
        salary: { from: 35000, to: 45000, period: 'annual' },
    },
    {
        message: 'I am 25 years old and want to earn 35 ph',
        salary: { from: 35, to: 0, period: 'hourly' },
    },
    {
        message: 'I am 25 years old and should get 150 per day',
        salary: { from: 150, to: 0, period: 'daily' },
    },
    {
        message: 'I am 25 years old and should get 150 d',
        salary: { from: 150, to: 0, period: 'daily' },
    },
    {
        message: 'I am 25 years old and should get 150 pd',
        salary: { from: 150, to: 0, period: 'daily' },
    },
    {
        message: 'I am 25 years old and should get 150 daily',
        salary: { from: 150, to: 0, period: 'daily' },
    },
    {
        message: 'Am 25 graduated 32 days ago and around 30- 45 K Full time Desired',
        salary: { from: 30000, to: 45000, period: 'annual' },
    },
    {
        message: 'r: New or junior barrister or solicitor Locations london or around 30- 45 K Full time Desired',
        salary: { from: 30000, to: 45000, period: 'annual' },
    },
    {
        message:
            'r: Finance jobs - Eg. Accountant, Assistant Accountant, Finance Manager, Assistant Finance Manager, etc Location - Orpington, Bromley Salary any amount - Eg. 25,000 and above,',
        salary: { from: 25000, to: 0, period: 'annual' },
    },
    {
        message:
            'r: I am interested in the job, werehouse Operative. Dunstable Lu5 down was. I like night shift from £13 going. Full time and overtime Okay 👍',
        salary: { from: 13, to: 0, period: 'hourly' },
    },
    {
        message:
            'r: hello im looking for a job in construction i have Npors cart for 10 tone 360 excavator but i can work as labour near Birmingham 12-13/h i work full time no thanks no thats all',
        salary: { from: 12, to: 13, period: 'hourly' },
    },
    {
        message:
            'r: I want to apply order picker/packer/warehouse operative Order picker/packer, I want to nearest my home, that means BS32 Bradley Stoke, I want to earn GBP 10 or above. I prefer to work on weekdays, that means Monday to Friday. First priority I prefer to work part time. Thanks again I found a really good job here but it is 4 on 4 offgood pay',
        salary: { from: 10, to: 0, period: 'hourly' },
    },
    {
        message:
            'r: I’m not looking at full time right now as I don’t want to waste anyones time if I don’t like it retail pay 10 ph to 15ph Kingston and part time yes or shop assistant warehouse to',
        salary: { from: 10, to: 15, period: 'hourly' },
    },
    {
        message:
            'r: Hi yes Howeevr, its only for a evening or weekend position this can be casual hours also office/Admin/customer service London or remote from £9 -£17 I am looking for hours starting from 5.30pm onwards and all day the weekend',
        salary: { from: 9, to: 17, period: 'hourly' },
    },
    {
        message:
            "r: Hello Yeah i am m looking for a job as a psychologist, Am currently doing my masters in oubliv health but i have a psychology degree. I would prefer to work in a clinical setting around Croydon, mitcham or streatham. Will like to be paid up 12 to 14 pounds hourly. Will like to work part tine because of my studies. Yeah in case you don't see any related to psychology, i can go with health care assistant Yeah sure redacted@gmail.com No am good So i can check on the link you sent now",
        salary: { from: 12, to: 14, period: 'hourly' },
    },
    {
        message:
            "r: Yes please Health care assistant Luton, st Albans. Luton and it's environs 25-30,000 per anum Full time",
        salary: { from: 25000, to: 30000, period: 'annual' },
    },
    {
        message:
            "r: Hello I just had my Class C licence and looking for a job as hgv2 driver I think I need help with my CV as well because I don't have one as such Preferred location Kilmarnock, full time, around 30k yearly Yes that would be great Also one important thing is that the employer is willing to help upgrade the licence to CE or to ADR Will you send them on my email?",
        salary: { from: 30000, to: 0, period: 'annual' },
    },
    {
        message:
            "r: I'm looking for kitchen assistant position Kitchen assistant I prefer Beeston  and salary expectations 10 per hour",
        salary: { from: 10, to: 0, period: 'hourly' },
    },
];

salaries.forEach((t) => {
    test(`${t.message}:salary:${t.salary.from}:${t.salary.to}:${t.salary.period}`, () => {
        const salary = extract.extractSalary(t.message);
        expect(salary).toEqual(t.salary);
    });
});
