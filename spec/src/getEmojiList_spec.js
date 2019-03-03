describe("getEmojiList: ", () => {

  const getEmojiList = require('../../src/getEmojiList');
  const filepath = 'emoji-list.json';

  it("return Promise", () => {
    expect(getEmojiList(filepath) instanceof Promise).toBe(true);
  });

  describe("return fullfilled Promise when valid path", () => {

    let ret;

    beforeEach(async () => {
      ret = await getEmojiList(filepath);
    })

    it("has 'emoji' property", () => {
      expect(typeof ret.emoji).not.toBe(typeof undefined);
    });

    it("is typeof object", () => {
      expect(typeof ret.emoji).toBe(typeof {});
    });

    it("has 'updated' propery", () => {
      expect(typeof ret.updated).not.toBe(typeof undefined);
    });

    it("is typeof integer", () => {
      expect(typeof ret.updated).toBe(typeof 0);
    });
  });

  describe("return rejected Promise when invalid path", () => {
    it("has error object", async (done) => {
      try {
        await getEmojiList('hogehoge');
      } catch(e) {
        done();
      }
    });
  });
});