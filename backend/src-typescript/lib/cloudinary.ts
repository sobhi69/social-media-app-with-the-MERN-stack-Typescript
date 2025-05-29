import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    api_key:process.env.CLOUDNIRAY_API_KEY,
    api_secret:process.env.CLOUDNIRAY_API_SECRET,
    cloud_name:process.env.CLOUD_NAME
})

export default cloudinary