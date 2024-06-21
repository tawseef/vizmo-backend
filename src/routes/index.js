const express = require("express");
const userRoute = require("./user.routes");
const blogRoute = require("./blog.routes");

const router = express.Router();

router.use("/v1/user",userRoute);
router.use("/v1/blog",blogRoute);



module.exports = router;
