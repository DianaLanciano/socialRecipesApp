import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import toast from "react-hot-toast";

const FriendsList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(
            "Something went wrong while trying to fetch friends. Please try again later."
          );
      }

      const data = await res.json();
      dispatch(setFriends({ friends: data }));

    } catch (error) {
      console.log("Error in fetching friends", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
        <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
        >
            Friends List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem" >
            {friends.map(friend => (
                <Friend 
                 key={friend._id}
                 friendId={friend._id}
                 name={`${friend.firstName} ${friend.lastName}`} 
                 location={friend.location} 
                 profilePicture={friend.profilePicture}
                />
            ))}
        </Box>
    </WidgetWrapper>
  );
};

export default FriendsList;
