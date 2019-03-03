
const fs = require('fs');

module.exports = (listPath) => new Promise((resolve, reject) => {
  fs.readFile(listPath, (err, data) => {
    if (err) reject(err);
    try {
      resolve(JSON.parse(data));
    } catch(e) {
      reject(e);
    }
  })
});
