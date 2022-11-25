import { Entity } from "./Entity";

export type Context = Record<string, any> & {
    question: (str: string) => Promise<string>;
    switchIntent: (msg?: string) => void;
    addComponent: <T>(component:React.FC, props:any)=>Promise<T>;

    sendMsg: (msg: string) => void;
    debug: boolean;
    log: (...args: any[]) => void
};

export interface INextable {
    next: (ctx: Context) => Promise<void>;
    start: (ctx: Context, fn: () => void) => void;
}
export interface IIntent {
    begin?: (ctx: Context, next: () => void) => Promise<void>;
    finally: (ctx: Context, next: () => void) => Promise<void>;
    match: (msg: string) => boolean;
}

export class Intent implements INextable {
    entities: Entity[] = []
    answered: Entity[] = []
    _begun = false;
    nextFn: (str?: string) => void = () => { };
    name: string = '';
    constructor() {
        if (!(this as unknown as IIntent).finally) {
            throw new Error(`${this.constructor.name} should implement IIntent`)
        }
        if (!this.name) {
            this.name = this.constructor.name;
        }
    }
    start(ctx: Context, nextFn: (msg?: string) => void) {
        this.nextFn = (msg?: string) => nextFn(msg);
        if (ctx[this.name]) {
            ctx[this.name] = {};
        } else {
            ctx[this.name] = {};
        }
        this.next(ctx);
    }

    reset(ctx:Context) {
        this._begun = false;
        ctx[this.name] = {}
    }
    /**
     * Intents are tested against this match function when a previous intent ends, or when ctx.switchIntent is called.
     * @param msg the utterance from the user.
     * @returns boolean value.
     */
    match(utterance: string) {
        return false;
    }
    /**
     * go through the entities and resolve the values. 
     * @param ctx 
     */
    async next(ctx: Context) {
        const entity = this.entities.find(e => (ctx[this.name] as any)[e.name] === undefined)

        const self = this as unknown as IIntent;
        if(typeof self.begin === 'function' && !this._begun){
            this._begun = true;
            self.begin(ctx, ()=>this.next(ctx));
        }

        else if (entity) {
            const cb = (val: string) => {
                (ctx[this.name] as any)[entity.name] = val;
                ctx.log(val, ctx, this.name);

                this.next(ctx)
            }
            entity(ctx, cb)
        } else {
            ctx.log('wrap', ctx, this.name);
            if (self.finally) {
                self.finally(ctx, (msg?: string) => this.nextFn(msg));
            }
        }
    }
}