
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleVideoLike = asyncHandler(async(req,res) =>{
    const {videoId} = req.params
    const likedBy =  req.user._id

    // check liked already added or not

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy
    })

    if (existingLike) {
        await Like.deleteOne({_id: existingLike._id})
        return res.status(201).json(new ApiResponse(201, existingLike, "Like withdraw successfully"))
    }

    const newLike = new Like({
        video:videoId,
        likedBy
    })

    await newLike.save()
    return res.status(200).json(new ApiResponse(200, newLike, "Liked successfully"))

})
const toggleCommentLike = asyncHandler(async(req,res) =>{
    const {commentId} = req.params
    const likedBy =  req.user._id

    // check liked already added or not

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy
    })

    if (existingLike) {
        await Like.deleteOne({_id: existingLike._id})
        return res.status(201).json(new ApiResponse(201, existingLike, "Like withdraw successfully"))
    }

    const newLike = new Like({
        comment: commentId,
        likedBy
    })

    await newLike.save()
    return res.status(200).json(new ApiResponse(200, newLike, "Liked successfully"))

})
const toggleTweetLike = asyncHandler(async(req,res) =>{
    const {tweetId} = req.params
    const likedBy =  req.user._id

    // check liked already added or not

    const existingLike = await Like.findOne({
        tweet:tweetId,
        likedBy
    })

    if (existingLike) {
        await Like.deleteOne({_id: existingLike._id})
        return res.status(201).json(new ApiResponse(201, existingLike, "Like withdraw successfully"))
    }

    const newLike = new Like({
        tweet:tweetId,
        likedBy
    })

    await newLike.save()
    return res.status(200).json(new ApiResponse(200, newLike, "Liked successfully"))

})

const getLikedVideos = asyncHandler(async(req,res) =>{
    
})



export{toggleVideoLike, toggleCommentLike, toggleTweetLike}