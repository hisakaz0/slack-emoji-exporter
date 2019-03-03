
const fs = require('fs');

const ErrorCode = {
  AUTH_ERROR: 1
};

module.exports = (slack, listPath) => slack.api("emoji.list",
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
  });