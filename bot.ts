import { ApplicationIntent } from './intents/ApplicationIntent';
import { JobSearchIntent } from './intents/JobSearchIntent';
import { ReminderIntent } from './intents/ReminderIntent';
import { Chatteroo } from './lib/Chatteroo';
import { EndIntent } from './intents/EndIntent';
import { StartIntent } from './intents/StartIntent';
import { HelpIntent } from './intents/HelpIntent';



new Chatteroo({log:console.log, debug:false})
.addIntent(new StartIntent())
.addIntent(new EndIntent())
.addIntent(new JobSearchIntent())
.addIntent(new ApplicationIntent())
.addIntent(new ReminderIntent())
.addIntent(new HelpIntent())
.start();
    