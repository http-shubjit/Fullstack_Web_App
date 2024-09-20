const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl,handleRedirectUrl,handleGetAllUrls,handleGetAnalytics}=require("../controllers/url")


router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectUrl)
router.get("/", handleGetAllUrls)
router.get("/analytic/:shortId",handleGetAnalytics)





module.exports = router;