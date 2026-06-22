const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//Add book to favorites

module.exports = router