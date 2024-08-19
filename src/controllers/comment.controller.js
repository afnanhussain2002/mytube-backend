import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async(req,res) =>{
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    const getComments = await Comment.aggregate([
        {
            $match:{
                "video": new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $skip:(page - 1) * limit
        },
        {
            $limit:limit
        }
    ])

    console.log('comments of the video', getComments);
    return res.status(200).json(new ApiResponse(200, getComments, "comments fetched successfully"))


})

const addComment = asyncHandler(async(req,res) =>{
    const {content, video} = req.body

    console.log(content, video);

    if (!content) {
        throw new ApiError(401, "Content is required for add comment")
    }

    const newComment = await Comment.create({
        content,
        video,
        owner: req.user
    })

    const createdComment = await Comment.findById(newComment._id)

    return res.status(200).json(new ApiResponse(200, createdComment, "Comment has been added"))


})

const updateComment = asyncHandler(async(req,res) =>{
   const {id} = req.params
   const {content} = req.body

   if (!content) {
    throw new ApiError(401, "Write something for update comment")
   }

   const updateComment = await Comment.findByIdAndUpdate(
    id,
    {
        $set:{
            content
        }
    },
    {new:true}
   )

   if (!updateComment) {
      throw new ApiError(501, "Something went wrong when update the comment")
   }

   return res.status(200).json(new ApiResponse(200, updateComment, "comment update successfully"))
})

const deleteComment = asyncHandler(async(req,res) =>{

    const {id} = req.params

    const deleteComment = await Comment.findByIdAndDelete(id)

    if (!deleteComment) {
        throw new ApiError("Something went wrong when delete the comment")
    }


    return res.status(200).json(new ApiResponse(200, deleteComment, "comment delete successfully"))

})

export{getVideoComments,addComment, updateComment, deleteComment}
