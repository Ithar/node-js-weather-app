const yargs = require('yargs');
const weather = require('./weather.js');

yargs.command({
    command: 'LOC', 
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

yargs.command({
    command: 'GEO', 
    describe: 'Name of the location',
    builder: {
        name: {
            type: 'string',
            demandOption: true,
            describe: 'Location name'
        }        
    },
    handler(argv) {
        weather.searchByNameGeocode(argv.name)
    }
});

yargs.parse();