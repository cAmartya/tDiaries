import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const connectToMongo = () => {
  mongoose.connect(MONGO_URL, () => {
    console.log("Connected to Mongo Successfully");
  });
};

export default connectToMongo;
