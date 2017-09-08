'use strict';

const express = require('express');
var path    = require("path");
const config = require('config');
var Client = require('node-rest-client').Client;

const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });

app.get('/api/bacon', (req, res) => {
    console.log("Request recieved....");

    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);

    var client = new Client();
    
    var predictionURL = config.get("CUSTOM_VISION_API_URL");
    var predictionKey = config.get("CUSTOM_VISION_API_KEY");
    var IsBacon = false;
    
    var args = {
        data: { url: query.url },
        headers: { "Content-Type": "application/json", "Prediction-Key" : predictionKey }
    };
    
    console.log("Calling Custom Vision API");
    client.post(predictionURL, args, function (data, response) {

        console.log("Processing results....");

        for(var i = 0; i < data.Predictions.length; i++)
            {
                if(data.Predictions[i].Tag == "bacon"){
                   if(data.Predictions[i].Probability > 0.80){IsBacon = true;} 
                }
            }
            console.log("Is Bacon: " + IsBacon)
            res.send({hasBacon : IsBacon}); 
    });   
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
