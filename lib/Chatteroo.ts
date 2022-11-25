import {Context, IIntent, INextable} from './Intent'
import * as readline from 'readline';
import { classifier } from '../classifier';
import {handleEntity, handleMsg} from '../terminal-example/openai'
import { extractKeywords, extractLocations, extractSalary, getBestMatch } from '../extract-job-keywords/extract';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (q:string):Promise<string> => new Promise(resolve=>{
    rl.question(q, (answer)=> resolve(answer.toString()));
});


const mlEntityQuestion = (q:string, entities: string):Promise<string> => new Promise(resolve=>{
    rl.question(q, async (answer)=> {
        
        const result = await handleEntity(answer, entities);
        resolve(result);
    });
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
            mlEntityQuestion,
            sendMsg: console.log,
            log,
            debug: options.debug
        }
        this.next = this.next.bind(this)
    }
    async onMessage(msg:string){
        const parsedMsg = classifier.classify(msg);
        
        const keywordTerms = extractKeywords(msg);
        const locationTerms = extractLocations(msg);
        const bestMatchKeyword = getBestMatch(keywordTerms) || undefined;
        const bestMatchLocation = getBestMatch(locationTerms) || undefined;
        const salary = extractSalary(msg);
        console.log(bestMatchKeyword, bestMatchLocation, salary)
        
        const result = await handleMsg(msg);

        let intent = this.intents.find(i => i.match(result.intent));
        // if(!intent){
        //     intent = this.intents.find(i => i.match(parsedMsg));
        // }
        this.ctx.log('found intent for msg', msg, intent)
        
        result.entities.forEach((el)=>{
            if(el.name === 'Location') el.value = bestMatchLocation;
            else if(el.name === 'JobTitle') el.value = bestMatchKeyword;
        })

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