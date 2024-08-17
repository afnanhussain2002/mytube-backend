import { User } from "../models/user.model.js";
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

    const {videoId} = req.params;

    const deleteAVideo = await User.findByIdAndDelete(
        
    )

})

export { publishVideo, getVideoById, updateVideoDetails, deleteVideo};
