import { Tweet } from "../models/tweet.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(async(req,res) =>{
    // get the content
   const {content} = req.body;
   
   if (!content) {
     throw new ApiError(400, "Write some content for tweet")
   }

   const tweet = await Tweet.create({
    content
   })

   
   const createdTweet = await Tweet.findById(tweet._id)
   
   if (!createdTweet) {
    throw new ApiError(500, "Something went wrong when upload the tweet")
   }

 

})

export{createTweet}