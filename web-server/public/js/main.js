console.log('client side JS')

$( document ).ready(function() {
    
    // Ajax
    function perforSearch(address) {
        
        const url = 'http://localhost:3000/weather?address=' + address

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

    function displayError(data) {
        $('#data-error-msg').html(data.msg) 
        $('#weatherContent').hide();
        $('#errorContainer').show()
    }

    function displayWeatherData(data) {
        
        const condition = data.condition;
        const speed = data.windSpeed;
        const desc = 'The weather forcast now is <b>' + condition + '</b> with wind speeds of <b>' + speed + '</b>.' 
        const icon = getIcon(802)

        const temp = '19' + '&deg;c'
        const tempMin = '8' + '&deg;c';
        const tempMax = '22' + '&deg;c';
        const humidity = '100'

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
        $('#data-humidity').html(humidity);

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