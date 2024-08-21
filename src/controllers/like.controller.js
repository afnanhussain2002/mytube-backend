import { asyncHandler } from "../utils/asyncHandler";


const toggleVideoLike = asyncHandler(async(req,res) =>{
    const {videoId} = req.params
    const likedBy =  req.user._id

    

})

export{toggleVideoLike}