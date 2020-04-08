const yargs = require('yargs');
const weather = require('./weather.js');

yargs.command({
    command: 'LOCATION', 
    describe: 'Name of the location',
    builder: {
        name: {
            type: 'string',
            demandOption: true,
            describe: 'Location name'
        }        
    },
    handler(argv) {
        weather.searchByName(argv.name)
    }
});

yargs.parse();