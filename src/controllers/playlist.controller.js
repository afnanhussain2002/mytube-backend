import mongoose from "mongoose";
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

    console.log('playlistID:',playlistId,"videoID:", videoId);

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(404, "Playlist not found!")
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

    const videoIndex = playlist.videos.indexOf(videoId)

    if (videoIndex === -1) {
        throw new ApiError(404, "Video not found on that playlist")
    }

    playlist.videos.splice(videoIndex, 1)

    await playlist.save()

    return res.status(200).json(new ApiResponse(200, "Video removed from playlist"))

})

export{createPlaylist, getUserPlaylist, addVideoToPlaylist, removeVideoFromPlaylist}