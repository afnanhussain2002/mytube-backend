import { Video } from "../models/video.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyOwner = asyncHandler(async(req,_,next) =>{
     try {
         const {videoId} = req.params
        const user = req.user

        const getOwnerVideo = await Video.findById(videoId)

        if (!user._id === getOwnerVideo.owner[0]) {
            throw new ApiError(401, "You are not the owner of that video")
        }

        next()
        

        
     } catch (error) {
        throw new ApiError(401, error.message || "You are not the owner of that video")
     }
})