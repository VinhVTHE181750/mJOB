const express = require("express");
const router = express.Router();

// Import route handlers
// const { getById } = require("./example2/Get");
// const { put } = require("./example2/Put");
const { deleteById } = require("./example2/Delete");
// const { post } = require("./example2/Post");

// Define routes
// these routes are all relative to /example2

// this is GET /example2/:id
// router.get("/:id", getPostById); // Route to get a post by ID

// this is PUT /example2/:id
// router.put("/:id", put);

// this is DELETE /example2/:id
router.delete("/:id", deleteById);

// this is POST /example2
// router.post("/", post);

module.exports = router;
