//step 12: upload file using multer. First upload the file on public folder, then send it to the cloudinary. step 13 on user.controllers.js
import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
  cb(null, "./public/temp")
    },

    filename:function(req,file,cb){
        cb(null, file.originalname) 
    }
})

export const upload = multer({storage})