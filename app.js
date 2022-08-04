require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("./config/passport");

const usersRouter = require("./routes/users");

var app = express();

// Set up mongoose
const mongoose = require("mongoose");
// const mongoDB = process.env.MONGO_URL;
const mongoDB = "mongodb+srv://shiptonaija:shiptonaija@cluster0.kyo3ifv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(compression());
app.use(helmet());

app.use("/api/users", usersRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;