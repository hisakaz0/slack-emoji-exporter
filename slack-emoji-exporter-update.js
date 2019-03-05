
const program = require('commander');
require('dotenv').config();

const getSlackInstance = require('./src/getSlackInstance');
const saveEmojiList = require('./src/saveEmojiList');

(async () => {

  const DEF_EMOJI_PATH = 'emoji-list.json';

  program
    .option('-p, --path [file]', 'Path to file of emoji list', DEF_EMOJI_PATH)
    .parse(process.argv);

  if (typeof process.env.SLACK_API_TOKEN === 'undefined') {
    throw new Error("SLACK_API_TOKEN is not set."); // TODO: logging the error
  }
  try {
    saveEmojiList(await getSlackInstance(process.env.SLACK_API_TOKEN), program.path);
  } catch(e) {
    throw e; // TODO: logging the error
  }

})();