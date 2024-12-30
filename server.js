// Setup empty JS object to act as endpoint for all routes
let projectData = {name: "Frying-Nemo"};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded());
app.use(express.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8080;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);

});

app.get('/', (req, res) => {
    res.status(200).send("Hello from Mariam Server baad ma telet rohaa")
})

app.get('/getData', (req, res) => {
    console.log(projectData);

    try {
        // const comingData = JSON.parse(req.body);
        // projectData = {...projectData, comingData}
        // console.log(projectData);
        const data = JSON.stringify(projectData);
        console.log("Hello from server");

        res.status(200).send(data)
    } catch (error) {
        console.error('error happened in get response', error)
    }
})