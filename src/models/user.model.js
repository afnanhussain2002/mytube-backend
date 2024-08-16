// step 7: Write user model for register or login a user. step 8 on video.model.js
import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

configDotenv()

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})
// step 10: write code for secure user account password and generate access token and refresh token with jwt for secure user data. Step 11 on cludinary.js
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// ACCESS_TOKEN
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRED
    }
)  
}
// REFRESH_TOKEN
userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
        _id: this._id,

    },
    process.env.REFRESH_TOKEN_EXPIRED,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRED
    }
)  
}

export const User = mongoose.model("User", userSchema)