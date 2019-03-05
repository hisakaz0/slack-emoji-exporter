
const fs = require('fs');

module.exports = (slack, listPath) => new Promise((resolve, reject) => {
  slack.api("emoji.list", async (err, response) => {
    if (!response.ok && typeof err !== 'undefined') {
      reject(err);
    }
    fs.writeFile(listPath, JSON.stringify({
      emoji: response.emoji,
      updated: Date.now(),
    }), (err) => {
      if (err) reject(err);
      console.log(`The file has been saved: ${listPath}`);
      resolve();
    });
  });
});