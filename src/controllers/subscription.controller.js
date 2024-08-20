import { asyncHandler } from "../utils/asyncHandler";


const toggleSubscription = asyncHandler(async(req,res) =>{
    // get channel for subscribe
    const {id} = req.params
    
    // add subscribed channel into array of object

})


export{toggleSubscription}