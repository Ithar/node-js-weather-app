console.log('client side JS')

$( document ).ready(function() {
    
    // Ajax
    function perforSearch(address) {
        
        const url = 'http://localhost:3000/weather?address=' + address

        fetch(url).then((response) => {
            response.json().then((data) => {
                console.log(data)
            })
        })
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