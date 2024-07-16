import { Box, useMediaQuery } from "@mui/material";
import UserCard from "components/UserCard";
import MyPostCard from "components/MyPostCard";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import FeedPosts from "components/FeedPosts";
import AdvertWidget from "components/Advert";
import FriendsList from "components/FriendsList";


const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, profilePicture } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserCard userId={_id} profilePicture={profilePicture} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostCard profilePicture={profilePicture} />
          <FeedPosts userId={_id} />
        </Box>

        {/* friends will be displayed only on none mobile screens */}
        {isNonMobile && (
          <Box flexBasis="20%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendsList userId={_id}/>
          </Box>
          )}
      </Box>
    </Box>
  );
};

export default HomePage;
