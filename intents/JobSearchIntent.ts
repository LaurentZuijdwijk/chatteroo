import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";
import { findJobs } from "../services/find-jobs-service";
import { handleEntity } from "../terminal-example/openai";

export class JobSearchIntent extends Intent implements IIntent {
  name = "JobSearch";
  description = "Get help finding a job";

  entities = [JobTitle, Location, Salary];

  match(msg: string): boolean {
    return msg.includes("find") && msg.includes("job");
  }
  async begin(ctx: Context, next: () => void) {
    await sleep(500);
    ctx.sendMsg(`I can help you find a job`);
    await sleep(500);
    next();
  }
  async finally(ctx: Context, next: () => void) {
    await sleep(1500);

    // extremely happy path
    //Right, I will search for developer jobs in London earning 20000

    ctx.sendMsg(
      `Right, I will search for ${ctx.JobSearch.JobTitle} jobs in ${ctx.JobSearch.Location} earning ${ctx.JobSearch.Salary}`
    );

    const offers = await findJobs(ctx.JobSearch);

    if(offers.length === 0){
      ctx.sendMsg(`Sadly we couldn't find any jobs`);
      return next()
    }

    ctx.sendMsg(`Here are your jobs: `);
    await sleep(2000);
    offers.forEach((el:any, i:number) => {
      ctx.sendMsg(`${i+1} = ${el.title} \n ${el.salaryDescription}`);
    });
    
    next();
  }
}

const Location: Entity = async (ctx: Context, next) => {
  let answer = await ctx.question(
    "OK, let’s figure out where you want to work.\n"
  );

  const parsedAnswer = await handleEntity(answer, 'location');
    console.log(parsedAnswer);
  
  answer = parsedAnswer.name == 'location' ? parsedAnswer.value : null;
  ctx.sendMsg(`Ok, you want to work in ${answer}`);
  next(answer);
};

const JobTitle: Entity = async (ctx: Context, next) => {
  const answer = await ctx.question("What are you looking for?  \n");
  ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
  next(answer);
};

const Salary: Entity = async (ctx: Context, next) => {
  const answer = await ctx.question("How much would you like to earn?  \n");
  ctx.sendMsg(`Ok, we will save your preference ${answer}`);
  next(answer);
};
