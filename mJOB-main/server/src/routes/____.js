// This is a template for creating a new route.
const express = require("express");
const db = require("../models/DBContext");

const router = express.Router();




////////////// Start editing here

// Set SQL queries here
const QUERY = "SELECT ...";



// GET without parameter
router.get("/", async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query(SELECT_POSTS_BY_DATE_DESC);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err });
  }
}); 


// GET with parameter
router.get("/:param", async (req, res) => {  // Change param to the parameter name, e.g: /:id or /:name

    // Write your code here

}); 


// POST with no parameter
router.post("/", async (req, res) => {

    // Write your code here

}); 



// Remember to edit server.js once finished

////////////// End editing here
module.exports = router;
