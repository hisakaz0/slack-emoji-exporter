
const Slack = require('slack-node');
const request = require('request');
const fs = require('fs');
const path = require('path');
const program = require('commander');

require('dotenv').config();

program
  .command('update') // update emoji list
  .option('-p, --path', 'Path to file of emoji list')
  .action((path, cmd) => {
    if (typeof cmd === 'undefined') cmd = path;
    console.log('updat'); // TODO: replace with target func
  });

program
  .command('download') // download emoji from list
  .option('-d, --dir', "Path to directroy emoji is saved")
  .action((dir, cmd) => {
    if (typeof cmd === 'undefined') cmd = dir;
    console.log('download');  // TODO: replace with target func
  });

program.parse(process.argv);


const ErrorCode = {
  AUTH_ERROR: 1
};
const SLEEP_TIME = 1000; // milisecond

const getSlackInstance = () => {
  try {
    return new Slack(process.env.SLACK_API_TOKEN);
  } catch(e) {
    console.error(e);
    return ErrorCode.AUTH_ERROR;
  }
}

const main = async () => {
  const slack = getSlackInstance();
  if (slack === ErrorCode.AUTH_ERROR) return; // exit

  await saveEmojiList(slack);
};

const saveEmojiList = (slack, listPath = 'emoji-list.json') => slack.api("emoji.list",
  async (err, response) => {
    if (!response.ok) {
      console.error(new Error("Invalid Authentication"));
      return ErrorCode.AUTH_ERROR;
    }
    fs.writeFile(listPath, JSON.stringify({
      emoji: response.emoji,
      updated: Date.now(),
    }), (err) => {
      if (err) throw err;
      console.log(`The file has been saved: ${listPath}`);
    });
    // const images = Object.entries(response.emoji)
    //   .filter(([, url]) => !url.match(/alias/))
    // for (let index = 0; index < images.length; index++) {
    //   const [name, url] = images[index];
    //   await sleep(SLEEP_TIME); // avoid timeout err
    //   await saveImage(name, url, 'png', outputDir);
    //   console.log(`${index} / ${images.length} / ${name}`);
    // }
  })

const saveImage = (name, url, ext, outputDir) => request
    .get(url)
    .on('response', (res) => {}) 
    .pipe(fs.createWriteStream(path.join(outputDir, `${name}.${ext}`)))

const sleep = (milisecond) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milisecond);
  });

// main();