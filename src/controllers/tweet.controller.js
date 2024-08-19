import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(async(req,res) =>{
    // get the content
   const {content} = req.body;
   
   if (!content) {
     throw new ApiError(400, "Write some content for tweet")
   }


})

export{createTweet}