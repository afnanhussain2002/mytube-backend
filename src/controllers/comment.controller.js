import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const {videoId} = req.params

  if (!comment) {
    throw new ApiError(401, "Write something for comment");
  }

  const newComment = new Comment({
    comment,
    video: videoId,
    owner: req.user,
  });

  await newComment.save();

  if (!newComment) {
    throw new ApiError(501, "Something went wrong while upload that comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newComment, "Comment has been added"));
});

export { addComment };
