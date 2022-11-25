import {Context, IIntent, INextable} from './Intent'
import readline from 'readline';
import { classifier } from '../classifier';
import {handleMsg} from '../terminal-example/openai'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (q:string):Promise<string> => new Promise(resolve=>{
    rl.question(q, (answer)=> resolve(answer.toString()));
});

type options = {
    debug:boolean;
    log:(...args:any[])=>void
}

export class Chatteroo {
    intents: (IIntent & INextable)[] = [];
    ctx:Context;
    constructor(options:options = {debug:false, log:console.log}) {
        const log = (...args:any[])=>{
            if(options.debug) options.log(...args)
        }
        this.ctx = {
            switchIntent: this.next.bind(this),
            question,
            sendMsg: console.log,
            log,
            debug: options.debug
        }
        this.next = this.next.bind(this)
    }
    async onMessage(msg:string){
        const parsedMsg = classifier.classify(msg);
        const result = await handleMsg(msg);

        let intent = this.intents.find(i => i.match(result.intent));
        // if(!intent){
        //     intent = this.intents.find(i => i.match(parsedMsg));
        // }
        this.ctx.log('found intent for msg', msg, intent)
        
        if(intent)
            intent.start(this.ctx, this.next, result.entities);
        
        else {
            this.ctx.sendMsg(`I don't think I understood that...`)
            this.next()
        }
    }

    addIntent(intent:IIntent & INextable){
        this.intents.push(intent);
        return this;
    }

    start() {
        this.intents[0].start(this.ctx, (msg?:string) => this.next(msg));
    }

    async next(msg?:string){
        if(msg) this.onMessage(msg);
        else {
            const answer = await this.ctx.question('Do you have any other questions? \n');
            this.onMessage(answer);     
        }
    }
    
    toGraph(){

    }

}