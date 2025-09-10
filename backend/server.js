require("dotenv").config();
const express = require("express");
const cors =require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app =  express();

app.use(
    cors(
        {
            origin: process.env.CLIENT_URL || "*",
            methods: ["GET", "POST", "PUT" , "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        } )
);

app.use(express.json());

connectDB();
app.get("/", (req, res) => {
    res.send("API is running and connected to MongoDB ✅");
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

