import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import toast from "react-hot-toast";
import PostFeedCard from "components/PostFeedCard";

/* This will display all posts that are in DB */
const FeedPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch(); // so we can use redux actions
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const res = await fetch("https://socialrecipesapp.onrender.com/posts/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserPosts = async () => {
    try {
      const res = await fetch(`http://localhost:3001/posts/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await res.json();
      dispatch(setPosts({ posts: data }));
      console.log(posts, "posts");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          location,
          picturePath,
          userProfilePicture,
          likes,
          comments,
        }) => (
          <PostFeedCard
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            postTitle={title}
            description={description}
            location={location}
            picturePath={picturePath}
            profilePicture={userProfilePicture}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default FeedPosts;
