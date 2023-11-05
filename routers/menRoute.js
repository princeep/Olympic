const express = require('express');
const menData = require('../controller/mens');
const { auth } = require('../middleware/auth');

const menroute = express.Router();

menroute.post("/add",menData.addMenRecord);
menroute.get("/all-mens",auth,menData.getAllRecord)
menroute.get("/:id",auth,menData.findMenById);
menroute.delete("/delete/:id",auth,menData.deleteMenById);
menroute.put("/update/:id",auth,menData.updateMenRanking)

module.exports = menroute;