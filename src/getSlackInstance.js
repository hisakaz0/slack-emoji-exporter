
const Slack = require('slack-node');

module.exports = () => {
  try {
    return Promise.resolve(new Slack(process.env.SLACK_API_TOKEN));
  } catch(e) {
    return Promise.reject(e);
  }
}