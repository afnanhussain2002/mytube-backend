import { asyncHandler } from "../utils/asyncHandler";

const createPlaylist = asyncHandler(async(req,res) =>{
    // get the details of playlist
    const {name, description} = req.body;
    



})

export{createPlaylist}