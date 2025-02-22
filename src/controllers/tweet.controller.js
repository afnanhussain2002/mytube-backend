import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  // get the content
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Write some content for tweet");
  }
  //   send to database
  const tweet = await Tweet.create({
    content,
    owner: req.user,
  });

  //    find that tweet
  const createdTweet = await Tweet.findById(tweet._id);

  if (!createdTweet) {
    throw new ApiError(500, "Something went wrong when upload the tweet");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdTweet, "Tweet upload successfully"));
});

const getUserTweet = asyncHandler(async (req, res) => {
  // get the user id
  const { userId } = req.params;

  //get tweets by that user id

  const findTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);
  if (!findTweets) {
    throw new ApiError(400, "No tweets found!");
  }
  console.log(findTweets);
  res
    .status(200)
    .json(new ApiResponse(200, findTweets, "Tweet fetched successfully"));
});

const updateTweet = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    const {content} = req.body

    if (!id) {
        throw new ApiError(401, "Tweet is not found!")
    }

    const updateTweet = await Tweet.findByIdAndUpdate(
        id,
        {
            $set:{
                content
            }
        },
        {new:true}
    )

    return res.status(200).json(new ApiResponse(200, updateTweet, "Tweet update successfully"))
})

const deleteTweet = asyncHandler(async(req,res) =>{
    const { id} = req.params

    if (!id) {
        throw new ApiError(400, "Tweet is not found!")
    }

    const deleteTweet = await Tweet.findByIdAndDelete(id)

    if (!deleteTweet) {
        throw new ApiError(500, "Something went wrong while delete that tweet")
    }

    return res.status(200).json(new ApiResponse(200, deleteTweet, "The tweet delete successfully"))
})

export { createTweet, getUserTweet, updateTweet, deleteTweet };
