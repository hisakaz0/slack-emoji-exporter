
describe("saveAsFile: ", () => {

  const saveAsFile = require('../../src/saveAsFile');
  const fs = require('fs');
  const path = require('path');

  const filename = 'logo.png';
  const url = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
  const writeStreamFunc = (dir = '.', file = filename) => {
    return fs.createWriteStream(path.join(dir, file));
  };
  
  const successFunc = (ws) => {
    return saveAsFile(url, ws);
  };

  it("return Promise", () => {
    const ret = successFunc(writeStreamFunc());
    expect(ret instanceof Promise).toBe(true);
  });

  it("file is created", async (done) => {
    try {
      await successFunc(writeStreamFunc().on('finish', () => done()));
    } catch(e) {
      fail();
    }
  });

  it("throw Error when url is invalid", async (done) => {
    try {
      await saveAsFile('hoge', writeStreamFunc().on('finish', () => fail()));
    } catch(e) {
      done();
    }
  });
});