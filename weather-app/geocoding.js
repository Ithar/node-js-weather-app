const chalk = require('chalk');
const got = require('got');

const geocode =  {
    
    getAccessToken() {
        return "YOUR_MAPBOX_ACCESS_TOKEN";
    },
    getURL() {
        return 'https://api.mapbox.com/geocoding/v5/mapbox.places/XXXXXXXXXX'; // &limit=1 
    },
    search(location) {
       
        (async () => {
           
            try {
                const url = this.getURL()+'/'+location+'?access_token='+this.getAccessToken();
        
                const response = await got(url, {responseType: 'json'})
                 
                console.log(chalk.green('success'))
            } catch (error) {
                console.log(chalk.red('Unable to read weather information at present'))
            }
        })();
    }
}

module.exports = geocode;