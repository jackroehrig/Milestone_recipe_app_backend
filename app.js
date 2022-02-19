require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//DB connection
connection();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes)
app.listen("/api/auth", authRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Port ${port} has risen...`));
