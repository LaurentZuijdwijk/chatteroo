import { Intent, IIntent, Context } from "../lib/Intent";
import { sleep } from "../lib/sleep";

export class EndIntent extends Intent implements IIntent {
    name = "end"

    match(msg: string): boolean {
        msg = msg.toLowerCase()
        return msg === 'bye' || msg === 'no' || msg === 'exit'
    }

    async finally(ctx: Context, next:(msg?:string)=>void) {
        ctx.question('Are you sure you want to exit? \n', async (answer)=>{
            if(answer === 'yes'){
                await sleep(1500);

                ctx.sendMsg('okthxbye 👋')
                process.exit()
            } else {
                next();
            }
        })
    }
}
