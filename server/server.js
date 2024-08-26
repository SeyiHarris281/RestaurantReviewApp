import { config } from 'dotenv';
import express from 'express';

// config for .env file
config();

const app = express();

// creates 'body' parameter in req object from request body
app.use(express.json());

// get data for restaurant with id
app.get("/api/v1/restaurants/:id" , (req, res) => {
    console.log(req.params);
    
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "Trill Burger"
        }
    });
});

//get data for all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant : ["chick fil a", "wendy's"]
        }
    });
});

// Create a new restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: req.body
    });
});

// updata a restaurant
app.put("/api/v1/restaurants/:id",(req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: req.body
    });
});

// delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success"
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is active and listening on port ${port}`);
});