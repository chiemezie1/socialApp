import Post from "../models/post.js"

//create
export const createPost = async (req, res) => {
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        const post = await Post.find();
        res.status(200).json(post);

    } catch (err){
        res.send(500).json({error: err.message})
    }
}


////////////////--Read----/////

export const getFeedPost = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        res.send(500).json({error: err.message})
    }
};

export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const userPost = await Post.find({userId});
        res.status(200).json(userPost);

    } catch (err) {
        res.send(500).json({error: err.message});
    }
};


////////////////--Update----/////

export const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        
        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        await post.save();

    } catch (err) {
        res.send(500).json({error: err.message});
    }
}