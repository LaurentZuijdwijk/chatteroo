import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";

export class JobSearchIntent extends Intent implements IIntent {
    name = "JobSearch"
    description = "Get help finding a job"


    entities = [JobTitle, Location, Salary]

    match(msg: string): boolean {
        return msg.includes('find') && msg.includes('job')
    }
    async begin(ctx: Context, next: () => void) {
        await sleep(500);
        ctx.sendMsg(`I can help you find a job, what would you like to do?`)
        await sleep(500);
        next();
    }
    async finally(ctx: Context, next: () => void) {
        await sleep(1500);

        ctx.sendMsg(`Right, I will search for ${ctx.JobSearch.JobTitle} jobs in ${ctx.JobSearch.Location} earning ${ctx.JobSearch.Salary}`)
        await sleep(1500);
        ctx.sendMsg(`Here are your jobs: tester, programmer, etx`)
        await sleep(2000);
        next();
    }
}

const Location: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('OK, let’s figure out where you want to work.\n');
    ctx.sendMsg(`Ok, you want to work in ${answer}`);
    next(answer);
}

const JobTitle: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What are you looking for?  \n');
    ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
    next(answer);
}
const Salary: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('How much would you like to earn?  \n');
    ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
    next(answer);
}