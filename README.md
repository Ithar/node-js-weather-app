# node-js-wather-app
Asynchronous weather app.

#### Features 
#### command-line-app 
- Fetches the weather from Command line input
- Uses `yargs` for command inputs
- Uses `got` for API requests
- Uses callback API chaining 

#### web-server 
- Frontend boostrap website with search form
- Uses `express` as the backend webserver
- Uess `handlebar` as the templating engine
- Uses `Heroku` for deployment

## Application Stack

Stack  | version |
--- | --- |  
*nodeJS* | v12.16.1
*npm* | 6.13.4
*Build Tool* | n/a
*CI* | Hereku
*Code Coverage* | n/a
*Build env* | local

## NPM Modules (Local)
> npm install yargs

> npm install chalk

> npm install got

> npm install express

> npm install hbs

## NPM Modules (Global)
> npm install -g nodemon

## Application Run
> web-server/src/ node app.js
> weather-app/src/ node app.js

## TODO [IM 20-04-10] - Remove
node app.js (LOC|GEO) [--name] ## []

## Application URL

[[ Local ]]

http://localhost:3000 

http://localhost:3000/about.html


[[ Heroku ]]

https://node-js-weather-app-v01.herokuapp.com

https://git.heroku.com/node-js-weather-app-v01.git


## Application GIT

heroku create node-js-weather-app-v01

git subtree push --prefix web-server heroku master

## Further enhancements 