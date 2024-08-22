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
        owner:req.user
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
    
})

export{createPlaylist}