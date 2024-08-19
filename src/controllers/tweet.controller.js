import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async(req,res) =>{
    // get the content
   const {content} = req.body;
   
   if (!content) {
     throw new ApiError(400, "Write some content for tweet")
   }
//   send to database
   const tweet = await Tweet.create({
    content
   })

//    find that tweet
   const createdTweet = await Tweet.findById(tweet._id)
   
   if (!createdTweet) {
    throw new ApiError(500, "Something went wrong when upload the tweet")
   }

   res.status(200).json(new ApiResponse(200, createdTweet, "Tweet upload successfully"))

})

export{createTweet}