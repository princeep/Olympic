const express = require('express');
const db = require("./db/connection")
const menRanking = require("./models/mens");
const menroute = require('./routers/menRoute');
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const MONGO_URL = process.env.MONGO_URL
db.connectDB(MONGO_URL)


app.use("/men", menroute)
app.listen(port, () => {
    console.log(`listening on ${port}`)
})