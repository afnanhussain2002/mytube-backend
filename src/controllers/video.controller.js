
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// publish video

const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Title and Description is required");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  const videoLocalPath = req.files?.videoFile[0]?.path;

  if (!thumbnailLocalPath && !videoLocalPath) {
    throw new ApiError(400, "Thumbnail and Video is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  const video = await uploadOnCloudinary(videoLocalPath);

  if (!thumbnail && !video) {
    throw new ApiError(400, "Thumbnail and Video is required");
  }

  const myTubeVideo = await Video.create({
    title,
    description,
    thumbnail: thumbnail?.url,
    videoFile: video?.url,
    duration: video?.duration,
    views: 0,
    owner: req.user,
  });

  const createdVideo = await Video.findById(myTubeVideo._id);

  if (!createdVideo) {
    throw new ApiError(500, "Something went wrong when upload the video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdVideo, "Video upload Successfully"));
});

/* const getAllVideos = asyncHandler(async(req,res) =>{
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

  // convert the page into number 
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseFloat(limit, 10);

  // Build the filter object

  const filter = {};
  if (query) {
    filter.title = { $regex: query, $options:"i"}
  }
  
  if (userId) {
    filter.userId = userId;
  }

  console.log("userId",filter);

  // Build the sort object

  const sort = {};

  sort[sortBy] = sortType === 'asc'? 1 : -1;

  // fetch videos from database 

  const videos = await Video.find(filter).sort(sort).skip((pageNumber -1) * limitNumber).limit(limitNumber)

  const totalVideos = await Video.countDocuments(filter)

  res.status(200).json(new ApiResponse(200, {
    success:true,
    data: videos,
    total:totalVideos,
    page: pageNumber,
    totalPages: Math.ceil(totalVideos / limitNumber)
  }, "Video fetched successfully"))



}) */

  const getAllVideos = asyncHandler(async(req,res) =>{
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
   
    // convert the page into number 
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseFloat(limit, 10);

  // Build the filter object

  const matchStage = {};
  if (query) {
    matchStage.title = { $regex: query, $options:"i"}
  }
  
  if (userId) {
    matchStage.userId = userId;
  }

  const sortStage = {};

  sortStage[sortBy] = sortType === 'asc'? 1 : -1;

  // aggregation pipeline

  const pipeline = [
    {$match: matchStage},
    {$sort: sortStage},
    {$skip: (pageNumber -1) * limitNumber},
    {$limit: limitNumber}
  ]

  const videos = await Video.aggregate(pipeline)

  const totalVideos = await Video.countDocuments(matchStage)

  res.status(200).json(new ApiResponse(200, {
    success:true,
    data: videos,
    total:totalVideos,
    page: pageNumber,
    totalPages: Math.ceil(totalVideos / limitNumber)
  }, "Video fetched successfully"))

   
  })
// get video by userId 
const getVideoByUserId = asyncHandler(async(req,res) =>{
  const {userId} = req.params;

  const getVideos = await Video.aggregate([
    {
      $match:{
        "owner": new mongoose.Types.ObjectId(userId)
      }
    }
  ])

  if (!getVideos) {
    throw new ApiError(400, "User Id not found!")
  }
   
  return res.status(200).json(new ApiResponse(200, getVideos, "Video fetched successfully"))
})
// get a single video

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  console.log("id", videoId);

  if (!videoId) {
    throw new ApiError(401, "Video Id is missing");
  }

  const singleVideo = await Video.findById(videoId);

  if (!singleVideo) {
    throw new ApiError(400, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, singleVideo, "Video found by id"));
});

//  update video details

const updateVideoDetails = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!videoId) {
    throw new ApiError(401, "Video Id is missing");
  }

  /* const thumbnailLocalPath = req.files?.thumbnail[0]?.path || "";
  const videoLocalPath = req.files?.videoFile[0]?.path || "";

  if (!(thumbnailLocalPath || videoLocalPath)) {
    throw new ApiError(400, "Thumbnail and Video is required");
  } */


    let thumbnailLocalPath;

    if (req.files.thumbnail) {
        thumbnailLocalPath = req.files.thumbnail[0].path;
    }else{
        thumbnailLocalPath = ""
    }

    let videoLocalPath;

    if (req.files.videoFile) {
        videoLocalPath = req.files.videoFile[0].path;
    }else{
        videoLocalPath = ""
    }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  const video = await uploadOnCloudinary(videoLocalPath);

  /*  if (! thumbnail && !video) {
        throw new ApiError(400, "Thumbnail and Video is required")
    } */

  if (!(title || description || thumbnail || video)) {
    throw new ApiError("Change anything for update details");
  }

  const updateVideoDetails = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title: title,
        description: description,
        thumbnail: thumbnail?.url,
        videoFile: video?.url,
        duration: video?.duration,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateVideoDetails,
        "Video details update successfully"
      )
    );
});

// delete a video

const deleteVideo = asyncHandler(async(req,res) =>{

    const {id} = req.params;

    const deleteAVideo = await Video.findByIdAndDelete( id )

    if (!deleteAVideo) {
        throw new ApiError(404, "Video not found")
    }

    return res.status(200).json(new ApiResponse(200, deleteAVideo, "Video delete successfully"))

})

// toggle between publish status

const togglePublishStatus = asyncHandler(async(req,res) =>{
 
 const {id} = req.params 

 const video = await Video.findById(id)

 if (!video) {
  throw new ApiError(400, "Video is not found!")
 }

 video.isPublished = !video.isPublished

 await video.save()

 return res.status(200).json(new ApiResponse(200, video, "Published Status Change Successfully"))


})

export { publishVideo, getVideoById, updateVideoDetails, deleteVideo, togglePublishStatus, getAllVideos, getVideoByUserId};
