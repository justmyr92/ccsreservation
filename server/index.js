const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require("./db/calinao.db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const authRoute = require("./routes/router");

app.use(express.json()); //req.body

app.use(cors());

app.use("/api", authRoute);

// ssh -i "mabini.pem" ubuntu@ec2-54-179-35-184.ap-southeast-1.compute.amazonaws.com

app.listen(process.env.PORT, () => {
    console.log(`Server is starting on port ${process.env.PORT}`);
    console.log("Grinding, grinding, grinding... ✊");
});
