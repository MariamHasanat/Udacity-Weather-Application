// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded());
app.use(express.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3030;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);

});

app.get('/', (req, res) => {
    res.status(200).send("Hello from Mariam Server baad ma telet rohaa")
})

app.get('/all', (req, res) => {
    try {
        const data = JSON.stringify(projectData);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

app.get('/getData', (req, res) => {
    console.log(projectData);

    try {
        // const comingData = JSON.parse(req.body);
        // projectData = {...projectData, comingData}
        // console.log(projectData);
        const data = JSON.stringify(projectData);
        console.log("Hello from server");

        res.status(200).json(data)
    } catch (error) {
        console.error('error happened in get response', error)
    }
})

app.post('/postData', (req, res) => {
    try {
        const data = req.body;
        console.log("Data received:", data);
        projectData = { ...projectData, ...data };
        console.log("Updated projectData:", projectData);

        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})