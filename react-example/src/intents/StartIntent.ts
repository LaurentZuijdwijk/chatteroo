import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class StartIntent extends Intent implements IIntent {
    async begin(ctx: Context, next: (msg?: string) => void) {
        ctx.sendMsg('<h1>👋</h1>');
        next();
    }
    async finally(ctx: Context, next: (msg?: string) => void) {
        await sleep(1500);
        const answer = await ctx.question('Hello, how can I help? 😀\n');
        next(answer);
    }
}
