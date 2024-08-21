import { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";


const toggleSubscription = asyncHandler(async(req,res) =>{
    // get channel for subscribe
    const {channelId} = req.params
    const subscriberId = req.user._id

    // check the subscriber already exists or not
    const existingSubscription = await Subscription.findOne({
        subscriber: subscriberId,
        channel: channelId
    })

    if (existingSubscription) {
        await Subscription.deleteOne({_id: existingSubscription._id})
        return res.status(200).json(new ApiResponse(200, existingSubscription, "Unsubscribe successfully"))
    }

    const newSubscription = new Subscription({
        subscriber: subscriberId,
        channel:channelId
    })
    await newSubscription.save();

    return res.status(201).json(new ApiResponse(201, newSubscription, "Subscribe successfully"))

    


})

const getUserChannelSubscriber = asyncHandler(async(req,res) =>{
    // get the channel id
    const {channelId} = req.params

    // find channel subscriber
    const getSubscriber = await Subscription.find({channel:channelId})
    if (!getSubscriber) {
        throw new ApiError(401, "No subscriber found!")
    }
    console.log("channel subscribers", getSubscriber);

    return res.status(200).json(new ApiResponse(200, getSubscriber, "Channel subscriber fetched successfully"))
})

const getSubscribedChannels = asyncHandler(async(req,res) =>{
    
})

export{toggleSubscription, getUserChannelSubscriber}