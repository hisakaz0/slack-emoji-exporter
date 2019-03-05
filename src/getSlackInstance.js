
const Slack = require('slack-node');

module.exports = (token) => {
  try {
    return Promise.resolve(new Slack(token));
  } catch(e) {
    return Promise.reject(e);
  }
}