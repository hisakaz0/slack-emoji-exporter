
const request = require('request');
const fs = require('fs');
const path = require('path');
const program = require('commander');

const getSlackInstance = require('./src/getSlackInstance');
const saveEmojiList = require('./src/saveEmojiList');

require('dotenv').config();

const DEF_EMOJI_PATH = 'emoji-list.json';

program
  .command('update') // update emoji list
  .option('-p, --path [file]', 'Path to file of emoji list', DEF_EMOJI_PATH)
  .action(async (path, cmd) => {
    if (typeof cmd === 'undefined') cmd = path;
    saveEmojiList(await getSlackInstance(), cmd.path);
  });

program
  .command('download') // download emoji from list
  .option('-d, --dir', "Path to directroy emoji is saved")
  .action((dir, cmd) => {
    if (typeof cmd === 'undefined') cmd = dir;
    console.log('download');  // TODO: replace with target func
  });

program.parse(process.argv);


const SLEEP_TIME = 1000; // milisecond


const main = async () => {
  const slack = getSlackInstance();
  if (slack === ErrorCode.AUTH_ERROR) return; // exit

  await saveEmojiList(slack);
};

const saveImage = (name, url, ext, outputDir) => request
    .get(url)
    .on('response', (res) => {}) 
    .pipe(fs.createWriteStream(path.join(outputDir, `${name}.${ext}`)))

const sleep = (milisecond) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milisecond);
  });

// main();