import { Entity } from "./Entity";

export type Context = Record<string, any> & {
    question: (str:string, cb:(answer:string)=>void) => any;
    switchIntent: (msg?:string)=>void;
    sendMsg: (msg:string)=>void;
    debug:boolean;
    log:(...args: any[])=>void
};

export interface INextable{
    next:(ctx:Context)=>Promise<void>;
}
export interface IIntent {
    finally:(ctx:Context, next:()=>void)=>Promise<void>;
    start:(ctx:Context, fn:()=>void)=>void;
    match:(msg:string) => boolean
}

export class Intent implements INextable{
    entities: Entity[] = []
    answered: Entity[] = []
    nextFn: (str?:string) => void = () => {};
    name:string  = '';
    constructor() {
        if(!(this as unknown as IIntent).finally){
            throw new Error(`${this.constructor.name} should implement IIntent`)
        }
        if(!this.name){
            this.name = this.constructor.name;
        }
    }
    start(ctx:Context, nextFn:(msg?:string)=>void) {
        this.nextFn = (msg?:string) => nextFn(msg);
        if(ctx[this.name]){
            ctx[this.name] = {};
        } else {
            ctx[this.name] = {};
        }
        this.next(ctx);

    }
    /**
     * Intents are tested against this match function when a previous intent ends, or when ctx.switchIntent is called.
     * @param msg the utterance from the user.
     * @returns boolean value.
     */
    match(utterance:string) {
        return false
    }
    /**
     * go through the entities and resolve the values. 
     * @param ctx 
     */
    async next(ctx:Context) {
        const entity = this.entities.find(e=> (ctx[this.name] as any)[e.name] === undefined)
        
        if (entity) {
            const cb = (val:string)=>{
                (ctx[this.name] as any)[entity.name] = val;
                ctx.log(val, ctx, this.name);

                this.next(ctx)
            }
            entity(ctx, cb)
        } else {
            ctx.log('wrap', ctx, this.name);
            if((this as unknown as IIntent).finally){
                (this as unknown as IIntent).finally(ctx, (msg?:string)=>this.nextFn(msg));
            }
        }
    }
}