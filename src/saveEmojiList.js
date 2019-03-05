
const fs = require('fs');

module.exports = (slack, listPath) => new Promise((resolve, reject) => {
  slack.api("emoji.list", async (err, response) => {
    if (!response.ok) reject(response.error);
    fs.writeFile(listPath, JSON.stringify({
      emoji: response.emoji,
      updated: Date.now(),
    }), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
});
