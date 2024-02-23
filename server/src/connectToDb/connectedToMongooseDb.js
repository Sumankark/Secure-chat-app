import mongoose from "mongoose";
import { databaseLink } from "../../config.js";



let connectToMongoDB = async() => {
    try{
        await mongoose.connect(databaseLink);
        console.log(`application is connected to mongodb database successfully ${databaseLink}`);
    }
    catch(error){
        console.log(error.message);
    }
};

export default connectToMongoDB;