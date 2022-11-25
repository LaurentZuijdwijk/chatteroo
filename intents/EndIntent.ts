import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class EndIntent extends Intent implements IIntent {
    name = "end intent"
    description = "goodbye message"
    match(msg: string): boolean {
        msg = msg.toLowerCase()
        return msg === 'bye' || msg === 'no' || msg === 'exit'
    }

    async finally(ctx: Context, next: (msg?: string) => void) {
        const answer = await ctx.question('Are you sure you want to exit? \n');
        if (answer === 'yes') {
            await sleep(1500);
            ctx.sendMsg('okthxbye 👋')
            process.exit()
        } else {
            next();
        }
    }
}
