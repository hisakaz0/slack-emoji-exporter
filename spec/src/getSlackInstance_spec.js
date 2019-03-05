
describe('getSlackInstance:', () => {
  require('dotenv').config();
  const getSlackInstance = require('../../src/getSlackInstance');

  it("resolve even if API_TOKEN is invalid.", async (done) => {
    try {
      await getSlackInstance('hogehoge');
      done();
    } catch(e) {
      fail();
    }
  });

  it("resolve if API_TOKEN is valid", async (done) => {
    try {
      await getSlackInstance(process.env.SLACK_API_TOKEN);
      done();
    } catch(e) {
      fail();
    }
  })
});