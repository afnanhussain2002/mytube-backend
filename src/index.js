// step 3: Connect database and check some error. Also make server

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();

const port = process.env.PORT || 8000;
connectDB()
.then(() =>{
  app.on('error', (error) =>{
    console.log('error form express', error);
  })
  app.listen(port, () =>{
    console.log(`Server is running at port: ${port}`);
  })
})
.catch(error =>{
  console.log('mongoDB connection failed!!!', error);
})




// professional approach for database connect
/* const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connected");
    app.on("error", (error) => {
      console.log("Error form express", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error from mongoDB connection", error);
  }
})();
 */