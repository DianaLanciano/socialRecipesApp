import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token : null,
    posts: [],
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // basiclly those are functions that will change the state and the payload its like argument to the function
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('User is not logged in - no friends to set'); 
            } 
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            //state.posts = [...state.posts, action.payload.post];
            const updatedPosts = state.posts.map(post => {
                if (post._id === action.payload.post._id) { 
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;