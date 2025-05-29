"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    api_key: process.env.CLOUDNIRAY_API_KEY,
    api_secret: process.env.CLOUDNIRAY_API_SECRET,
    cloud_name: process.env.CLOUD_NAME
});
exports.default = cloudinary_1.v2;
