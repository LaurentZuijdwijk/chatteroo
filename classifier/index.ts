const { BayesClassifier } = require('natural');

export const classifier = new BayesClassifier();

classifier.addDocument('Looking for a job', 'find job');
classifier.addDocument('I\'m looking for a job', 'find job');
classifier.addDocument('searching for a new job', 'find job');
classifier.addDocument('searching for a new role', 'find job');
classifier.addDocument('function', 'find job');
classifier.addDocument('job', 'find job');
classifier.addDocument('role', 'find job');
classifier.addDocument('searching for a new position', 'find job');
classifier.addDocument('want a new gig', 'find job');
classifier.addDocument('searching for a job posting', 'find job');
classifier.addDocument('searching for a new position', 'find job');

classifier.addDocument('What about my current applications', 'application');
classifier.addDocument('what about the job I applied for', 'application');
classifier.addDocument('My applications', 'application');
classifier.addDocument('I want to be forgotten', 'forgotten');

classifier.addDocument('help me', 'help');
classifier.addDocument('I want assistance', 'help');
classifier.addDocument('What to do', 'help');
classifier.addDocument('What questions can I ask?', 'help');
classifier.addDocument('How can you help me?', 'help');

classifier.addDocument('which commands do you support', 'help');

classifier.train();

