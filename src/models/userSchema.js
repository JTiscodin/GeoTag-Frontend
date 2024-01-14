import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    address: String,
    phone: Number,
    location: {lat: String, long: String},
    quality: String,
    model: String,
    capactiy: String,
    fov: String,
    orientation: String,
    url: String

})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User; 
