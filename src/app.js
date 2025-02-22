// 2nd steps import express, put that on a variable and export it. Step 3 on index.js 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()
// step 9: use some express middlewares for get the data with limit. Step 10 on user.model.js 52 line
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
// step 17: Make the main route for register a user. step 18 on user.controllers.js line 5
// routes import 
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import commentRouter from "./routes/comment.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRoute from "./routes/playlist.routes.js"


// routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlists", playlistRoute)


export {app}