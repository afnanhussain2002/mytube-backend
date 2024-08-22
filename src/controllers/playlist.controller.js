import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const createPlaylist = asyncHandler(async(req,res) =>{
    // get the details of playlist
    const {name, description} = req.body;

    if (!name) {
        throw new ApiError(401, "This playlist must have a name")
    }

    



})

export{createPlaylist}