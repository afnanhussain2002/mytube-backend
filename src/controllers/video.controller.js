import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const publishVideo = asyncHandler(async(req,res) =>{
    const {title, description} = req.body;


    if (
        [title, description].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "Title and Description is required")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    const videoLocalPath = req.files?.videoFile[0]?.path

    if (!thumbnailLocalPath && !videoLocalPath) {
        throw new ApiError(400, "Thumbnail and Video is required")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    const video = await uploadOnCloudinary(videoLocalPath)

    if (! thumbnail && !video) {
        throw new ApiError(400, "Thumbnail and Video is required")
    }

    const myTubeVideo = await Video.create({
        title,
        description,
        thumbnail: thumbnail?.url,
        videoFile: video?.url,
        duration: video?.duration,
        views:0,
        owner:req.user


    }) 

    const createdVideo = await Video.findById(myTubeVideo._id)

    if (!createdVideo) {
        throw new ApiError(500, "Something went wrong when upload the video")
    }

    return res.status(200).json(new ApiResponse(200, createdVideo, "Video upload Successfully"))


})

export{publishVideo}