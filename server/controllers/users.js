import User from "../models/user.js";

//read
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(({_id, fristName, lastName, occupation, location, picturePath}) => ({
            _id,
            fristName,
            lastName,
            occupation,
            location,
            picturePath,
        }));
        res.status(200).json(formattedFriends);

    } catch(err){
        res.status(500).json({error: err.message});
    } 
}

//update    

export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId); 
            friend.friends = friend.friends.filter((id) => id !== id);
            const updatedUser = await user.save();
            const updatedFriend = await friend.save();
            res.status(200).json(updatedUser);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const formattedFriends = friends.map(({_id, fristName, lastName, occupation, location, picturePath}) => ({
            _id,
            fristName,
            lastName,
            occupation,
            location,
            picturePath,
        }));
        res.status(200).json(formattedFriends);
        
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

