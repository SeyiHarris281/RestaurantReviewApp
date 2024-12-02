import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { dbQuery } from './db/index.js';


// config for .env file
config();

const app = express();

// Example of middleware concept. 
// Note: The next() function tells middleware to pass packet on to the next middleware after running.
// Note: If url is not specified, middleware will apply to all routes.
// Note: Middleware will be executed in the order in which they are declared.
app.use((req, res, next) => {
    console.log("First middleware ran");
    next();
});

// Middleware to handle CORS
app.use(cors());

// Another middleware to creates 'body' parameter in req object from request body
app.use(express.json());

// get data for restaurant with id
app.get("/api/v1/restaurants/:id" , async (req, res) => {
    
    try {
        // Parameterized query is recommended for sql accessing. Avoid string concatenation and literals as they introduce
        // sql injection vulnerabilities.
        const { id } = req.params;
        const restaurant = await dbQuery(`SELECT * FROM restaurants LEFT JOIN (SELECT fk_restaurant_id, COUNT(rating) as rating_count, TRUNC(AVG(rating), 1) AS rating_average FROM reviews GROUP BY fk_restaurant_id) ON id = fk_restaurant_id WHERE id = $1`, [id]);
        const reviews = await dbQuery(`SELECT * FROM reviews WHERE fk_restaurant_id = $1`, [id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (err) {
        console.log(err);
    }
    
    
    
});

//get data for all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    
    try {
        const { rows } = await dbQuery('SELECT * FROM restaurants LEFT JOIN (SELECT fk_restaurant_id, COUNT(rating), TRUNC(AVG(rating),1) AS rating_average FROM reviews GROUP BY fk_restaurant_id) ON id = fk_restaurant_id;');

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
    
    try {
        const { name, location, price_range } = req.body;
        const { rows } = await dbQuery('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *', [name, location, price_range]);
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
        res.status(204).json({
            status: "success",
            deleted: rows[0]
        });
    } catch (err) {
        console.log(err);
    }

});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rating, review } = req.body;
        const { rows } = await dbQuery("INSERT INTO reviews (name, rating, review, fk_restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, rating, review, id])
        res.status(201).json({
            status: "success",
            data: {
                review: rows[0]
            }
        });
    } catch(err) {

    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is active and listening on port ${port}`);
});