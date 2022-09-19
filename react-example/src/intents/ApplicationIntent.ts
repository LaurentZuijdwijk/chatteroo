import { sleep } from "../lib/sleep";
import { Context, IIntent, Intent } from "../lib/Intent";

export class ApplicationIntent extends Intent implements IIntent{
    name = "JobSearch"
    constructor() {
        super();
        this.entities = []
    }
    match(msg: string): boolean {
        return msg.includes('application')
    }
    async finally(ctx: Context, next:()=>void) {
        await sleep(1500);

        ctx.sendMsg(`I will try to find your application`)
        await sleep(1500);
        ctx.sendMsg(`🤔`)
        await sleep(500);
        ctx.sendMsg(`It seems like your application is in progress`)
        next();
    }
}