const chalk = require('chalk');
const got = require('got');

const geocode =  {
    
    getAccessToken() {
        return "pk.eyJ1IjoiaXRoYXIiLCJhIjoiY2s4cmtmdzQ1MGFmZjNwcDY0dGdwNmw1bSJ9.5NmldoU2EFcnsliB76yETw";
    },
    getURL() {
        return 'https://api.mapbox.com/geocoding/v5/mapbox.places/{location}.json?';
    },
    search(location, callback) {
       
        (async () => {
    
            try {
                
                let url = this.getURL().replace('{location}', location);
                url = url + 'limit=1&access_token='+this.getAccessToken();

                const response = await got(url, {responseType: 'json'})

                if (response.body.features.length > 0) {
                    const data = {
                        location : response.body.features[0].place_name,
                        lng :  response.body.features[0].center[0],
                        lat : response.body.features[0].center[1]    
                    }
                
                    console.log(chalk.green(data.location + '\t[' + data.lat + ',' + data.lng+']'));
                    callback(undefined,  data)
                } else {
                    const error = 'Unable to get coordinates for location:' + location;
                    console.log(chalk.red(error));
                    callback(geocode.errorResponse(error, 'G-687841'), undefined)
                }
                
            } catch (error) {
                console.log(chalk.red('Unable to geocoding information at present'))
                console.log(chalk.red('ERROR: ' + error.message))
                callback(geocode.errorResponse(error.message, 'G-25875647'), undefined)
            }
        })();
    },
    errorResponse(error, code) {
        return {
            success: false,
            error,
            code
        }
    }
}

module.exports = geocode;