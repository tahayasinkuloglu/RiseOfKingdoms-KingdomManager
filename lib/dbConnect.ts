import mongoose from "mongoose";

const URI = process.env.MONGO_URI as string;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(URI);
    return connection;
  } catch (error) {
    console.error("db connection fail: ", error);
    throw error;
  }
};

export default dbConnect;
