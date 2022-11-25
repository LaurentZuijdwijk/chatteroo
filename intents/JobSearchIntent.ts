import { sleep } from "../lib/sleep";
import { Entity } from "../lib/Entity";
import { Intent, IIntent, Context } from "../lib/Intent";
import { findJobs } from "../services/find-jobs-service";
import { handleEntity } from "../terminal-example/openai";

export class JobSearchIntent extends Intent implements IIntent {
  name = "JobSearch";
  description = "Get help finding a job";

  // entities = [JobTitle, Location, Salary];
  entities = [JobTitle, Location, Salary];

  match(msg: string): boolean {
    return msg.includes("find") && msg.includes("job");
  }

  async begin(ctx: Context, next: () => void) {
    await sleep(500);
    ctx.sendMsg(`I can help you find a job`);

    await Generic(ctx, ()=>{});

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

const Generic: Entity = async (ctx: Context, next) => {
  const missing = ['Location', 'JobTitle', 'Salary'].filter((el:any)=>
    ctx.JobSearch[el] === undefined
  )
  console.log(missing)

  let answer = await ctx.question(
    `OK, give me some more details, like ${missing.map(el=>el.toLowerCase()).join(', ')}.\n`
  );

  const parsedAnswer = await handleEntity(answer, missing.join(', '));
    console.log(parsedAnswer);
  
    ctx.JobSearch.Location = parsedAnswer.Location || ctx.JobSearch.Location
    ctx.JobSearch.JobTitle = parsedAnswer.JobTitle || ctx.JobSearch.JobTitle
    ctx.JobSearch.Salary = parsedAnswer.Salary || ctx.JobSearch.Salary

  // answer = parsedAnswer.name == 'location' ? parsedAnswer.value : null;
  ctx.sendMsg(`Ok, thank you`);
  next();
}

const Location: Entity = async (ctx: Context, next) => {
  let answer = await ctx.mlEntityQuestion("OK, let’s figure out where you want to work.\n", 'Location');
  // let answer = await ctx.question(
  //   "OK, let’s figure out where you want to work.\n"
  // );

  // const parsedAnswer = await handleEntity(answer, 'location');
  //   console.log(parsedAnswer);
  if(answer.Location) {
    ctx.sendMsg(`Ok, you want to work in ${answer.Location}`);
    return next(answer.Location);
  }
  else return next()
  // answer = parsedAnswer.name == 'location' ? parsedAnswer.value : null;
  next(answer);
};

const JobTitle: Entity = async (ctx: Context, next) => {
  const answer = await ctx.question("What job title are you looking for?  \n");
  ctx.sendMsg(`Oh, so you want to work as a ${answer}`);
  next(answer);
};

const Salary: Entity = async (ctx: Context, next) => {
  const answer = await ctx.question("How much would you like to earn?  \n");
  ctx.sendMsg(`Ok, we will save your preference ${answer}`);
  next(answer);
};
