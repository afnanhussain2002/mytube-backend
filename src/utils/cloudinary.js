// step 11 for upload file on cloudinary. step 12 on multer.middleware.js
import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import fs from "fs"

configDotenv()


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // file upload process

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        // upload file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log('File is uploaded on cloudinary', response);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove local temporary file if upload operation got failed 
        return null;
    }
}

export{uploadOnCloudinary}

