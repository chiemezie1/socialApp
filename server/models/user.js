import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    lastName:{
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 50,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    picturePath:{
        type: String,
        default: "",
    },
    friends:{
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: {
        type: Number,
        default: 0,
    },
    impressions: {
        type: Number,
        default: 0,
    }

}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;