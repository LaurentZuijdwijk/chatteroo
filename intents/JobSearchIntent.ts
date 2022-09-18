import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";

export class JobSearchIntent extends Intent implements IIntent {
    name = "JobSearch"
    entities = [DescriptionEntity, LocationEntity, SalaryEntity]

    match(msg: string): boolean {
        return msg.includes('find') && msg.includes('job')
    }
    async finally(ctx: Context, next: () => void) {
        await sleep(1500);

        ctx.sendMsg(`Ok, we will search for ${ctx.JobSearch.DescriptionEntity} jobs in ${ctx.JobSearch.LocationEntity} paying at least ${ctx.JobSearch.SalaryEntity}`)
        await sleep(1500);
        ctx.sendMsg(`Here are your jobs: tester, programmer, etx`)
        await sleep(2000);
        next();
    }
}

const LocationEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('Where do you want to work? \n');
    ctx.sendMsg(`Ok, you want to work in ${answer}`);
    next(answer);
}

const SalaryEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('How much would you like to earn?  \n');
    if (answer === 'application') {
        ctx.switchIntent('application')
    }
    else if (!parseInt(answer) || parseInt(answer) < 100 || parseInt(answer) > 100_000_000) {
        ctx.sendMsg(`That doesn't seem right`);
        SalaryEntity(ctx, next);
    }
    else {
        ctx.sendMsg(`Ok, we will search for jobs earning ${answer}`);
        next(answer);
    }
};

const DescriptionEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What kind of job do you want to find?  \n');
    ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
    next(answer);
}