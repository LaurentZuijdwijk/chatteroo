import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";
import { StartQuestionView } from "../views/StartQuestionView";
import { ButtonOptionsView } from "../views/ButtonOptionsView";

export class JobSearchIntent extends Intent implements IIntent {
    name = "JobSearch"
    entities = [DescriptionEntity, LocationEntity]

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

        ctx.sendMsg(`Right, I will search for ${ctx.JobSearch.DescriptionEntity} jobs in ${ctx.JobSearch.LocationEntity}`)
        await sleep(1500);
        ctx.sendMsg(`Here are your jobs: tester, programmer, etx`)
        await sleep(2000);
        next();
    }
}

const LocationEntity: Entity = async (ctx: Context, next) => {
    // const answer = await ctx.question('Where do you want to work?\n');
    // const answer = <string>await ctx.addComponent(StartQuestionView, {});
    const answer = <string>await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'Where do you want to work?', options: ['London', 'Berlin', 'Paris']});

    ctx.loading();
    await sleep(2000); 
    ctx.sendMsg(`Ok, you want to work in ${answer}`);
    next(answer);
}


const DescriptionEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What job title are you searching for?  \n');
    ctx.loading();
    await sleep(2000);

    ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
    next(answer);
}