import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

})

export{addComment, updateComment}
