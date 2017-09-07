'use strict';

const express = require('express');
const config = require('config');

var Client = require('node-rest-client').Client;
var client = new Client();

var predictionURL = config.get("CUSTOM_VISION_API_URL");
var predictionKey = config.get("CUSTOM_VISION_API_KEY");

var args = {
    data: { url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Made20bacon.png" },
    headers: { "Content-Type": "application/json", "Prediction-Key" : predictionKey }
};

client.post(predictionURL, args, function (data, response) {
    // raw response 
    console.log(data.TagId);
});

// Constants
//const PORT = 8080;
//const HOST = '0.0.0.0';

// App
//const app = express();
//app.get('/', (req, res) => {
//  res.send('Hello world\n');
//});

//app.listen(PORT, HOST);
//console.log(`Running on http://${HOST}:${PORT}`);
