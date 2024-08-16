// 1st step connect the database. step 2 on app.js

import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`mongoDB Connected !! DB HOST: ${connect.connection.host}`);
    } catch (error) {
        console.log('mongoDB connection error', error);
        process.exit(1)
    }
}

export default connectDB

