const express = require('express');
const Banner = express.Router();
const {createBanner,getAllBanners,updateBanner,deleteBanner} = require('../Controllers/Banner')

Banner.post("/CreateBanner", createBanner);
Banner.get("/getAllBanners", getAllBanners);
Banner.patch("/updateBanner/:id", updateBanner);
Banner.delete("/deleteBanner/:id", deleteBanner);


module.exports = Banner;