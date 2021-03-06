$( document ).ready(function() {
    
    // Ajax
    function perforSearch(address) {

        if (address === '') {
            displayError({
                msg: 'Please enter valid address'
            })
        } else {
            const url = '/weather?address=' + address

            fetch(url).then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    
                    if (data.success) {
                        displayWeatherData(data)
                    } else {
                        displayError(data)
                    }
                })
            })
        }
    }

    function displayError(data) {
        $('#data-error-msg').html(data.msg) 
        $('#weatherContent').hide();
        $('#errorContainer').show()
    }

    function displayWeatherData(data) {
        
        const forcast = data.forcast;
        const speed = data.windSpeed;
        const desc = 'The weather forcast now is <b>' + forcast + '</b> with wind speeds of <b>' + speed + '</b>.' 
        const icon = getIcon(802)

        const temp = data.temperature + '&deg;c'
        const tempMin = data.temperatureMin + '&deg;c';
        const tempMax = data.temperatureMax + '&deg;c';
        
        const location = data.location.substr(0, data.location.lastIndexOf(","))
        const country = data.location.substr(data.location.lastIndexOf(",") + 1, data.location.length)
        const lat = data.lat
        const lng = data.lng
        
        // Weather
        $('#data-weather-desc').html(desc);
        $("#data-weather-icon").attr("src", icon);

        // Temperature
        $('#data-temperature').html(temp);
        $('#data-temperature-min').html(tempMin);
        $('#data-temperature-max').html(tempMax);

        // Location
        $('#data-location').html(location);
        $('#data-country').html(country);
        $('#data-lat').html(lat);
        $('#data-lng').html(lng);

        $('#errorContainer').hide()
        $('#weatherContent').show();

    }

    function getIcon(id) {

        let icon

        if (id >= 200 && id <= 232) {
            icon = 'thunderstorm.png'
        } else if (id >= 300 && id <= 231) {
            icon = 'drizzle.png'
        } else if (id >= 500 && id <= 531) {
            icon = 'rain.png'
        } else if (id >= 600 && id <= 622) {
            icon = 'snow.png'
        } else if (id >= 201 && id <= 781) {
            icon = 'mist.png'
        } else if (id == 800) {
            icon = 'sun.png'
        } else if (id >= 801 && id <= 804) {
            icon = 'cloud.png'
        } 
        
        return './img/weather/' + icon;
    }

    // Events
    $('#searchForm').submit((e) => {
        e.preventDefault()
        const address = $('#address').val()
        perforSearch(address)

    })

    $('#searchBtn').click(() => {
        const address = $('#address').val()
        perforSearch(address)
    })
  
});