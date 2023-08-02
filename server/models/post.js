import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
            min: 3,
            max: 30,
        },
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
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    },{timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;