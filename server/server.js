import { config } from 'dotenv';
import express from 'express';
//import db from "./db/index.js";
import { dbQuery } from './db/index.js';

// config for .env file
config();

const app = express();

// creates 'body' parameter in req object from request body
app.use(express.json());


// get data for restaurant with id
app.get("/api/v1/restaurants/:id" , async (req, res) => {
    
    
    try {
        // Parameterized query is recommended for sql accessing. Avoid string concatenation and literals as they introduce
        // sql injection vulnerabilities.
        const { id } = req.params;
        const { rows } = await dbQuery(`SELECT * FROM restaurants WHERE id = $1`, [id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
    
    
    
});

//get data for all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    
    try {
        const { rows } = await dbQuery('SELECT * FROM restaurants');

        res.status(200).json({
            status: "success",
            count: rows.length,
            data: {
               restaurants : rows
            }
        });
    } catch (err) {
        console.log(err);
    }
    
});

// Create a new restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const { name, location, price_range } = req.body;
        const { rows } = await dbQuery('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range]);
        console.log(rows[0]);
        res.status(201).json({
            status: "success",
            data: rows[0]
        });
    } catch (err) {
        console.log(err);
    }
    
});

// updata a restaurant with given id
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const { rows } = await dbQuery('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id]);
        console.log(rows);
        res.status(200).json({
            status: "success",
            data: rows[0]
        });
    } catch (err) {
        console.log(err);
    }
    
});

// delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { rows } = await dbQuery('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        console.log(rows);
        res.status(200).json({
            status: "success",
            deleted: rows[0]
        });
    } catch (err) {
        console.log(err);
    }
        
    
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is active and listening on port ${port}`);
});