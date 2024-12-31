// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');

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
        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

app.post('/postData', (req, res) => {
    try {
        const data = req.body;
        projectData = { ...projectData, ...data };
        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})