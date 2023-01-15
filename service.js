
const appConfig = require('./config/app.json');


// const cron = require("node-cron");
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || appConfig.port;

var todoList = require('./app/controller/appController.js');

// cron.schedule("* * 5 * *", function() {
// 	var moment = require('moment');
// 	var thn = moment().format('Y');
// 	var bln = moment().format('M');
// 	var tgl = '01';
// 	var tanggal = thn+'-'+bln+'-'+tgl;
// 	todoList.lockData(tanggal,function(err, values){
// 		console.log(values);	
// 	});
    
// });


app.listen(port);

console.log('E-Litabmas server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route
