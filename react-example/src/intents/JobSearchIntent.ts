import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";

export class JobSearchIntent extends Intent implements IIntent {
    name = "JobSearch"
    entities = [DescriptionEntity, LocationEntity, SalaryEntity]

    match(msg: string): boolean {
        return msg.includes('find') && msg.includes('job')
    }
    async begin(ctx: Context, next: () => void) {
        await sleep(500);
        ctx.sendMsg(`I’ve got quite a few new jobs for you today.<br><br>In 4 easy steps, I can filter them with you 😃.`)
        await sleep(500);
        next();
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
    const answer = await ctx.question('OK, let’s figure out where you want to work.\n');
    ctx.loading();
    await sleep(2000); 
    ctx.sendMsg(`Ok, you want to work in ${answer}`);
    next(answer);
}

const SalaryEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('Is there anything we should consider regarding salary?\n');
    if (answer === 'application') {
        ctx.switchIntent('application')
    }
    else if (!parseInt(answer) || parseInt(answer) < 100 || parseInt(answer) > 100_000_000) {
        ctx.sendMsg(`That doesn't seem right`);
        SalaryEntity(ctx, next);
    }
    else {
        ctx.loading();
        await sleep(2000);

        ctx.sendMsg(`Ok, we will search for jobs earning ${answer}`);
        next(answer);
    }
};

const DescriptionEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What are you looking for?  \n');
    ctx.loading();
    await sleep(2000);

    ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
    next(answer);
}