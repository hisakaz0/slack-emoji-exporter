
const request = require('request');

module.exports = (url, writeStream) => {
  try {
    return Promise.resolve(
      request
       .get(url)
       .on('response', () => {})
       .pipe(writeStream)
    );
  } catch(e) {
    return Promise.reject(e);
  }
}