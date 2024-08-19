import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


/* export const verifyOwner = asyncHandler(async(req,_,next) =>{
     try {
         const {videoId} = req.params
        const userId = req.user
        

        const getOwnerData = await Video.findById(videoId)

        if (!getOwnerData) {
            throw new ApiError(400, "Data not found")
        }

        console.log("video owner", getOwnerData.owner[0]);

        if (!userId._id.equals(getOwnerData.owner[0])) {
            throw new ApiError(401, "You are not the owner")
        }

           

        next()
        

        
     } catch (error) {
        throw new ApiError(401, error.message || "You are not the owner of that video")
     }
}) */

     export const verifyOwner = (Model) =>{
        return asyncHandler(async(req,_,next) =>{
            try {
                const {id} = req.params
               const userId = req.user
               
       
               const getOwnerData = await Model.findById(id)
       
               if (!getOwnerData) {
                   throw new ApiError(400, "Data not found")
               }
       
               console.log("Owner", getOwnerData.owner[0]);
       
               if (!userId._id.equals(getOwnerData.owner[0])) {
                   throw new ApiError(401, "You are not the owner")
               } 
       
               next()
       
            } catch (error) {
               throw new ApiError(401, error.message || "You are not the owner of that video")
            }
        })
     }