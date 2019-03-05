
const program = require('commander');

program
  .option('-d, --dir', "Path to directroy emoji is saved")
  .action((dir, cmd) => {
    if (typeof cmd === 'undefined') cmd = dir;
    console.log('download');  // TODO: replace with target func
  });