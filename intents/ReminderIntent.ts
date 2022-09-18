import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";

export class ReminderIntent extends Intent implements IIntent {
    entities = [SubjectEntity, TimeEntity];

    match(msg: string): boolean {
        return msg.toLowerCase().includes('reminder') || (msg.includes('remind') && msg.includes('me'))
    }
    async finally(ctx: Context, next: () => void) {
        await sleep(1500);

        ctx.sendMsg(`Ok, I will remind you of ${ctx.ReminderIntent.SubjectEntity} @ ${ctx.ReminderIntent.TimeEntity}`)
        await sleep(1500);
        next();
    }
}

const SubjectEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('What do you want me to remind you of? \n')
    ctx.sendMsg(`Ok, I'll remind you of ${answer}`);
    next(answer);

}

const TimeEntity: Entity = async (ctx: Context, next) => {
    const answer = await ctx.question('Wht time would you like to be reminded?  \n')
    if (answer === 'cancel') {
        ctx.switchIntent()
    }
    else {
        next(answer);
    }
};
