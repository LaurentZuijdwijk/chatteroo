import { Context } from "./Intent";

export type Entity = (ctx:Context, next: (value:string)=>void)=>Promise<void>
