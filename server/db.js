import mongoose from 'mongoose';
import dotenv from 'dotenv'
// const MONGO_URL = 'mongodb://localhost:27017/Diaries?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const connectToMongo = () => {
  mongoose.connect(MONGO_URL, () => {
    console.log("Connected to Mongo Successfully");
  });
};

export default connectToMongo;


// const mongoURI = 'mongodb+srv://amartya:Amartya.6411@cluster0.kvdsk.mongodb.net/?retryWrites=true&w=majority';
