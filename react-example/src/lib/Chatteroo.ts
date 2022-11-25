import React from 'react';
import {Context, IIntent, INextable} from './Intent'
// import readline from 'readline';
// import { classifier } from '../classifier';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const question = (q:string):Promise<string> => new Promise(resolve=>{
    // rl.question(q, (answer)=> resolve(answer.toString()));
});

type options = {
    debug:boolean;
    log:(...args:any[])=>void
    addQuestion: (t:any)=>Promise<string>
    addComponent: <T>(component:React.FC, props:any)=>Promise<T>
    sendMsg: (t:any)=>void,
    loading: ()=>void,
}

export class Chatteroo {
    intents: (IIntent & INextable)[] = [];
    ctx:Context;
    constructor(options:Partial<options> = {
        debug:false, 
        log:console.log, 
        loading:()=>{}}) {
        const log = (...args:any[])=>{
            if(options.debug) options.log!(...args)
        }
        this.ctx = {
            switchIntent: this.next.bind(this),
            question: options?.addQuestion || question,
            addComponent: <T>(component:React.FC, props:any)=> Promise.resolve({} as T),

            sendMsg: options!.sendMsg || console.log,
            loading: options?.loading,
            log,
            debug: options.debug || false
        }
        this.next = this.next.bind(this)
    }
    onMessage(msg:string){
        // const parsedMsg = classifier.classify(msg);
        let intent = this.intents.find(i => i.match(msg));
        // if(!intent){
        //     intent = this.intents.find(i => i.match(parsedMsg));
        // }
        this.ctx.log('found intent for msg', msg, intent)
        
        if(intent)
            intent.start(this.ctx, this.next);
        
        else {
            this.ctx.sendMsg(`I don't think I understood that...`)
            this.next()
        }
    }

    addIntent(intent:IIntent & INextable){
        this.intents.push(intent);
        return this;
    }

    options(options:Partial<options>){
        if(options?.addQuestion) this.ctx.question = options?.addQuestion;
        if(options?.addComponent) this.ctx.addComponent = options?.addComponent;

        if(options?.sendMsg)     this.ctx.sendMsg = options.sendMsg
        if(options?.loading)     this.ctx.loading = options.loading
        return this
    }

    start() {
        this.intents[0].start(this.ctx, (msg?:string) => this.next(msg));
    }
    stop() {
        this.ctx = {} as any;
        this.intents = [];
    }
    async next(msg?:string){
        if(msg) this.onMessage(msg);
        else {
            const answer = await this.ctx.question('Do you have any other questions? \n');
            this.onMessage(answer);     
        }
    }
}