import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    CLOUD_NAME:process.env.CLOUD_NAME ,
    API_KEY: process.env.API_KEY,
    API_SECRET:process.env.API_KEY
})

export default cloudinary