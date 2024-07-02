const router = require("express").Router();
const apicontroller = require("../controller/apicontroller");

router.get("/hello", apicontroller);

module.exports = router;
