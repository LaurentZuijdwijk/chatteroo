import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class HelpIntent extends Intent implements IIntent {
    match(msg: string): boolean {
        return msg === 'help'
    }
    async finally(ctx: Context, next:(msg?:string)=>void) {
        ctx.sendMsg('You can use the following commands:\n');
        await sleep(500);
        ctx.sendMsg('find job');
        await sleep(500);

        ctx.sendMsg('applications');
        await sleep(500);
        ctx.sendMsg('reminder');

        next();
    }
}
