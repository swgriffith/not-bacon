'use strict';

const express = require('express');
const config = require('config');
var Client = require('node-rest-client').Client;

const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/isbacon', (req, res) => {
    console.log("Request recieved....");

    var client = new Client();
    
    var predictionURL = config.get("CUSTOM_VISION_API_URL");
    var predictionKey = config.get("CUSTOM_VISION_API_KEY");
    var IsBacon = false;
    
    var args = {
        data: { url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Made20bacon.png" },
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

            res.send("Is Bacon? " + IsBacon); 
    });   
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
