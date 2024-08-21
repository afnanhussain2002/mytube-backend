import { Like } from "../models/like.model";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const toggleVideoLike = asyncHandler(async(req,res) =>{
    const {videoId} = req.params
    const likedBy =  req.user._id

    // check liked already added or not

    const existingLike = await Like.findById({
        video:videoId,
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

    await Like.save()
    return res.status(200).json(new ApiResponse(200, newLike, "Liked successfully"))

})

export{toggleVideoLike}