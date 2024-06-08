
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://ashish:ashish@cluster0.eycafwc.mongodb.net/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED VAYO HAI TA... DB VITRA KO INDEX.JS MA ", error);
        process.exit(1)
    }
}

export default connectDB