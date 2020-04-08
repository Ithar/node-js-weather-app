const chalk = require('chalk');
const got = require('got');

const geocode =  {
    
    getAccessToken() {
        return "pk.eyJ1IjoiaXRoYXIiLCJhIjoiY2s4cmtmdzQ1MGFmZjNwcDY0dGdwNmw1bSJ9.5NmldoU2EFcnsliB76yETw";
    },
    getURL() {
        return 'https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?';
    },
    search(location) {
       
        (async () => {
    
            try {
                
                let url = this.getURL().replace('{location}', location);
                url = url + 'limit=1&access_token='+this.getAccessToken();

                console.log('>>>>>> ' + url);

                const response = await got(url, {responseType: 'json'})

                if (response.body.features[0] !== undefined) {
                    const placeName = response.body.features[0].place_name;
                    const lng = response.body.features[0].center[0];
                    const lat = response.body.features[0].center[1];
                
                    console.log(chalk.green(placeName + '\nlat:' + lat + '\nlng' + lng));
                } else {
                    console.log(chalk.red('Unable to get coordinates for location:' + location));
                }

                
            } catch (error) {
                console.log(chalk.red('Unable to geocoding information at present'))
                console.log(chalk.red('ERROR: ' + error.message))
            }
        })();
    }
}

module.exports = geocode;