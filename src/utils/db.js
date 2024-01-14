import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Jatin:ujyZumigxot7VWsJ@cluster0.j3ba6jl.mongodb.net/geo-tagging?retryWrites=true&w=majority"
    );
    console.log("Connected to Database")
  } catch (err) {
    console.log(err)
  }
};

export default connectDB; 