const express = require("express");
const router = express.Router();

const upload = require("../services/upload.service");
const { registerVisitor } = require("../controllers/visitor.controller");

router.post("/register", upload.single("photo"), registerVisitor);

module.exports = router;
