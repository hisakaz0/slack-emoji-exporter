
const program = require('commander');

program
  .description('Slack emoji export command')
  .command('update', 'update emoji list').alias('u')
  .command('download', 'download emoji images').alias('d')
  .parse(process.argv);