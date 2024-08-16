// step 6: Write utils code for handle async and promise. Step 7 on user.model.js
const asyncHandler = (requestHandler) =>{
    return(req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}
    export {asyncHandler};









// method 2
/* const asyncHandler = (fn) => async(req,res,next) =>{
    try {
        await fn(req,res,next)
    } catch (error) {
       res.status(error.code || 500).json({
        success:false,
        message:error.message
       }) 
    }
} */
