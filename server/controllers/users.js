import User from "../models/User.js";

//getUser, getUserFriends, addRemoveFriends

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json('No user id was provided');

        const user = await User.findById(id);
        if (!user) res.status(400).json('No user was found');

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
   try {
    const { id } = req.params;
    if (!id) res.status(400).json('No user id was provided');

    const user = await User.findById(id);
    if (!user) res.status(400).json('No user was found');

    const friends = await PromiseAll(
        user.friends.map(id => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, location, profilePicture }) => {
            return { _id, firstName, lastName, location, profilePicture }
        }
    ); 
    
    res.status(200).json(formattedFriends);
   } catch (error) {
    res.status(404).json({ message: error.message });
   }

};

export const addRemoveFriends = async (req, res) => {
    try {
        const { id: currentUserId, friendId } = req.params;
        const currentUser = await User.findById(currentUserId); // user that wants to add/remove friend
        const friend = await User.findById(friendId); // the target friend that the user wants add/remove

        if (currentUser.friends.includes(friendId)) {
            // remove from current user
            currentUser.friends = currentUser.friends.filter(id => id !== friendId);
            // remove from friend
            friend.friends = friend.friends.filter(id => id !== currentUserId);
        } else {
            // add new friend 
            currentUser.friends.push(friendId);
            friend.friends.push(currentUserId);
        }

        await currentUser.save();
        await friend.save();

        // now format users friends and send to client
        const friends = await PromiseAll(
            currentUser.friends.map(id => User.findById(id))
        );
    
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, location, profilePicture }) => {
                return { _id, firstName, lastName, location, profilePicture }
            }
        )

        res.status(200).json(formattedFriends);

    } catch (error) {
        
    }
};