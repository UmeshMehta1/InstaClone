import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:'dcvfw4bow',
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

export default cloudinary