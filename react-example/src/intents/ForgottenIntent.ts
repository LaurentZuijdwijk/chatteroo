import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";
// import { StartQuestionView } from "../views/StartQuestionView";
import { ButtonOptionsView } from "../views/ButtonOptionsView";

export class ForgottenIntent extends Intent implements IIntent {
    name = "ForgottenIntent"
    entities = [NameEntity, EmailEntity]

    match(msg: string): boolean {
        return msg.includes('forgotten')
    }
    async begin(ctx: Context, next: () => void) {
        await sleep(500);

        ctx.sendMsg(`Ok, I will help you delete your data?`)
        await sleep(500);
        next();
    }
    async finally(ctx: Context, next: () => void) {
        await sleep(1500);

        ctx.sendMsg(`Ok, thanks for providing your data ${ctx.ForgottenIntent.NameEntity}`)
        await sleep(1500);
        ctx.sendMsg(`We will process this and email you`)
        await sleep(2000);
        next();
    }
}

const NameEntity: Entity = async (ctx: Context, next) => {
    // const answer = await ctx.question('Where do you want to work?\n');
    // const answer = <string>await ctx.addComponent(StartQuestionView, {});
    // const answer = <string>await ctx.addComponent(ButtonOptionsView, {className:'', msg: 'What is your name?', options: []});
    const answer = await ctx.question('What is your name?\n');

    ctx.loading();
    await sleep(2000); 
    ctx.sendMsg(`Ok your name is ${answer}`);
    next(answer);
}


const EmailEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What is your email address?  \n');
    ctx.loading();
    await sleep(2000);

    ctx.sendMsg(`Thanks for providing that${answer}`);
    next(answer);
}