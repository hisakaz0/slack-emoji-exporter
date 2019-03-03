
const Slack = require('slack-node');
const request = require('request');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

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

const main = () => {
  const slack = getSlackInstance();
  if (slack === ErrorCode.AUTH_ERROR) return; // exit

  saveEmojiList(slack, 'image');
};

const saveEmojiList = (slack, outputDir = 'image') => slack.api("emoji.list",
  async (err, response) => {
    if (!response.ok) {
      console.error(new Error("Invalid Authentication"));
      return ErrorCode.AUTH_ERROR;
    }
    const images = Object.entries(response.emoji)
      .filter(([, url]) => !url.match(/alias/))
    for (let index = 0; index < images.length; index++) {
      const [name, url] = images[index];
      await sleep(SLEEP_TIME); // avoid timeout err
      await saveImage(name, url, 'png', outputDir);
      console.log(`${index} / ${images.length} / ${name}`);
    }
  })

const saveImage = (name, url, ext, outputDir) => request
    .get(url)
    .on('response', (res) => {}) 
    .pipe(fs.createWriteStream(path.join(outputDir, `${name}.${ext}`)))

const sleep = (milisecond) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milisecond);
  });

main();