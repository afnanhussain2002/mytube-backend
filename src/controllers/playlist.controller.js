import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async(req,res) =>{
    // get the details of playlist
    const {name, description} = req.body;

    if (!name && !description) {
        throw new ApiError(401, "This playlist must have a name and description")
    }

    const savePlaylist = await Playlist.create({
        name,
        description: description,
        owner:req.user,
        video:[]
    })

    if (!savePlaylist) {
        throw new ApiError(501, "Something went wrong when create playlist")
    }

    const createdPlaylist = await Playlist.findById(savePlaylist._id)

    if (!createPlaylist) {
        throw new ApiError(400, "No playlist found!")
    }

    return res.status(200).json(new ApiResponse(200, createdPlaylist, "Playlist created successfully" ))


})

const getUserPlaylist = asyncHandler(async(req,res) =>{

    const {userId} = req.params

    const findPlaylist = await Playlist.aggregate([
        {
            $match:{
                "owner":new mongoose.Types.ObjectId(userId)
            }
        }
    ])
    if (!findPlaylist) {
        throw new ApiError(400, "No playlist found!")
    }

    console.log("find playlist of user", findPlaylist);

    return res.status(200).json(new ApiResponse(200, findPlaylist, "Playlist fetch successfully"))


})

const addVideoToPlaylist = asyncHandler(async(req,res) =>{

    const {playlistId, videoId} = req.params

    const playlist = await Playlist.findById(playlistId)


    if (!playlist) {
        throw new ApiError(404, "Playlist not found!")
    }
    
    if (playlist.owner[0].toString() !== req.user._id.toString()) {
        throw new ApiError(401, "You are not the owner of that playlist")
    }


    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "That video already added on that playlist")
    }

    playlist.videos.push(videoId)

    await playlist.save()

    return res.status(200).json(new ApiResponse(200, "Video added on playlist"))



})

const removeVideoFromPlaylist = asyncHandler(async(req,res) =>{
    const {playlistId, videoId} = req.params

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(404, "Playlist not found!")
    }

    if (playlist.owner[0].toString() !== req.user._id.toString()) {
        throw new ApiError(401, "You are not the owner of that playlist")
    }

    const videoIndex = playlist.videos.indexOf(videoId)

    if (videoIndex === -1) {
        throw new ApiError(404, "Video not found on that playlist")
    }

    playlist.videos.splice(videoIndex, 1)

    await playlist.save()

    return res.status(200).json(new ApiResponse(200, "Video removed from playlist"))

})

const updatePlaylist = asyncHandler(async(req,res) =>{
    const {id:playlistId} = req.params
    const {name, description} = req.body

    if (!(name || description)) {
        throw new ApiError(401, "name or description have to provide for update playlist")
    }

    const updatePlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {new:true}
    )

    if (!updatePlaylist) {
        throw new ApiError(500, "Something went wrong when update playlist")
    }

    return res.status(200).json(new ApiResponse(200, updatePlaylist, "Playlist update successfully"))
})

export{createPlaylist, getUserPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, updatePlaylist}