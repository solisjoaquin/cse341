const express = require("express");

const router = express.Router();

const contacts = require("./contacts");

router.use("/", require("./swagger"));

router.use("/contacts", contacts);

module.exports = router;
