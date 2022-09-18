import {Context, IIntent} from './Intent'
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

type options = {
    debug:boolean;
    log:(...args:any[])=>void
}


export class Chatteroo {
    intents: IIntent[] = [];
    ctx:Context;
    constructor(options:options = {debug:false, log:console.log}) {
        const log = (...args:any[])=>{
            if(options.debug) options.log(...args)
        }
        this.ctx = {
            switchIntent: this.next.bind(this),
            question: rl.question.bind(rl),
            sendMsg: console.log,
            log,
            debug: options.debug
        }
        this.next = this.next.bind(this)
    }
    onMessage(msg:string){
        const intent = this.intents.find(i => i.match(msg));
        this.ctx.log('found intent for msg', msg, intent)
        
        if(intent)
            intent.start(this.ctx, this.next);
        
        else {
            this.ctx.sendMsg(`I don't think I understood that...`)
            this.next()
        }
    }

    addIntent(intent:IIntent){
        this.intents.push(intent);
        return this;
    }

    start() {
        this.intents[0].start(this.ctx, (msg?:string) => this.next(msg));
    }

    next(msg?:string){
        if(msg) this.onMessage(msg);
        else {
            this.ctx.question('Do you have any other questions? \n', (answer:string) => {
                this.onMessage(answer);
            });
        }
    }
}