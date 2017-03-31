'use strict';


const Hapi = require('hapi');
const Vision = require('vision')
const Handlebars = require('handlebars')
const Good = require('good')
const Bcrypt=require('bcrypt');
const BasicAuth=require('hapi-auth-basic');


var assert = require('assert');

var custom_fields  = require('./rutas/model');      // fields required to login
var custom_handler = require('./rutas/controller'); // handler for login
var opts = {
  fields: custom_fields,
  handler: custom_handler,
  fail_action_handler: custom_handler
};






// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: process.env.IP, 
    port: process.env.PORT || 3000 
});







const Sequelize=require('sequelize');
const sequelize = new Sequelize('c9', 'adriana2828', "", {
  host: 'localhost',
  dialect: 'mysql',
});






server.register([Vision,
  { register: require('hapi-login'), options:opts }], function (err) {
  assert(!err, 'Failed to load plugin: ', err); // FATAL ERROR!
  server.views({
      engines: {
      html:{
            module: require('handlebars'),
            isCached: false, //dev mode only
            compileMode: 'sync' //dev mode only
        }
    },
    relativeTo: __dirname,
    path: __dirname + '/views',
    //layout: true,
    //layout: 'default',
    layoutPath: './views/layout',
    helpersPath: './views/helpers',
    partialsPath: './views/partials'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: custom_handler // display registration form
  });
});









// Start the server
server.start((err) => {
if (err) {
        throw err;
    }
   console.log('Server running at:', server.info.uri);
});







/*
// register vision to your server instance
server.register(Vision, function (err) {  
  if (err) {
    console.log('Cannot register vision')
  }
// configure template support   
    server.views({
    engines: {
      html:{
            module: require('handlebars'),
            isCached: false, //dev mode only
            compileMode: 'sync' //dev mode only
        }
    },
    relativeTo: __dirname,
    path: __dirname + '/views',
    //layout: true,
    //layout: 'default',
    layoutPath: './views/layout',
    helpersPath: './views/helpers',
    partialsPath: './views/partials'
    
  })
})
*/


//______________________________________________________________________________
//registro del plugin que permite tener las rutas en otro archivo

server.register([
  {
    register: BasicAuth
  },
  {
    register: require('./rutas/routes')
  },
  {
    register: Good,
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        console: [
          {
            args: [ { log: '*', response: '*', request: '*' } ]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  }
]);
//______________________________________________________________________________














