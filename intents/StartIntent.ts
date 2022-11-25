import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class StartIntent extends Intent implements IIntent {
    name = "start intent"
    async begin(ctx: Context, next: (msg?: string) => void) {
        ctx.sendMsg('😀😀');
        next();
    }
    async finally(ctx: Context, next: (msg?: string) => void) {
        await sleep(1500);
        const answer = await ctx.question('Hello, how can I help? 😀\n');
        
        next(answer);
    }
}
