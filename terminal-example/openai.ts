const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);
export const handleMsg = async (msg: string) => {

  const result = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Utterance: ${msg}  
  Intents: [{name: 'find job', entities: ['JobTitle', 'Location', 'Salary']}
  {name:'create CV', entities: null}]
  {name:'application status', entities: null}]

  json object with an intent and possible entities from the utterance above

  example json:
    {
        "intent": string,
        "entities?: [{
            name: string,
            value: string | number,
            confidence: float
        }]
    }

  json: 
  `,
    temperature: 0,
    max_tokens: 200,
  });
  const resultJSON = JSON.parse(result.data.choices[0].text)

  resultJSON.entities = resultJSON.entities.filter((el:any) => el.value)
  .filter((el:any) => el.name === 'JobTitle' && el.value !== 'job')
  .filter((el:any) => el.name === 'JobTitle' && el.value !== 'jobs')

return resultJSON
}
