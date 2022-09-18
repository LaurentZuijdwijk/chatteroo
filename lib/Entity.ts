import { Context } from "./Intent";

export type Entity = (ctx:Context, next: (value?)=>void)=>Promise<void>
