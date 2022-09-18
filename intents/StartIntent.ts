import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class StartIntent extends Intent implements IIntent {
    match(msg: string): boolean {
        return false
    }
    async finally(ctx: Context, next:(msg?:string)=>void) {
        await sleep(1500);
        ctx.question('Hello, what do you want to do? 😀\n', (answer) => {   
            next(answer);
        });
    }
}
