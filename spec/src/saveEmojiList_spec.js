
describe('saveEmojiList:', () => {
  
  const getSlackInstance = require('../../src/getSlackInstance');
  const saveEmojiList = require('../../src/saveEmojiList');
  require('dotenv').config();

  const listPath = 'hoge.json';

  it('reject if slack api accesses with invalid token', async () => {
    try {
      await saveEmojiList(await getSlackInstance('hogehoge'), listPath);
      fail();
    } catch(e) {
      expect(e).toBe('invalid_auth');
    }
  });

  it('resolve if slack api accesse with valid token', async (done) => {
    try {
      await saveEmojiList(await getSlackInstance(process.env.SLACK_API_TOKEN), listPath);
      done();
    } catch(e) {
      fail(e);
    }
  });

  it('reject if filepath is empty', async (done) => {
    try {
      await saveEmojiList(await getSlackInstance(process.env.SLACK_API_TOKEN), '');
      fail();
    } catch(e) {
      done();
    }
  });

  it('reject if filepath is directory', async (done) => {
    try {
      await saveEmojiList(await getSlackInstance(process.env.SLACK_API_TOKEN), 'src');
      fail();
    } catch(e) {
      done();
    }
  });
});