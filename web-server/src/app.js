const express = require('express')

const server = express()

// Home Page
server.get('', (req, res) => {
    res.send('You are on the index page')

})

// Help
server.get('/help', (req, res) => {
    res.send('Help page')

})

server.listen(3000, () => {
    console.log('Express server is up and running !');
})