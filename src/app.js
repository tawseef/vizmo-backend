const express = require("express");
const app = express();
const cors = require("cors");
// const routes = require("./routes/routes");
const routes = require("./routes/index");
const helmet = require("helmet");

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.options("*", cors());


app.use("/", routes);



module.exports = app;