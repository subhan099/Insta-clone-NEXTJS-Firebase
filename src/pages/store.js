import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userAgent } from "next/server";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  value: [
    {
      uid: "",
      username: "",
      photoURL: "",
      postURL: "",
      description: "",
    },
  ],
  myPosts: [
    {
      uid: "",
      username: "",
      photoURL: "",
      postURL: "",
      description: "",
    },
  ],
  usersRedux: [
    {
      uid: "",
      username: "",
      photoURL: "",
    },
  ],
  // followedUsersRedux: [
  //   {
  //     uid: "",
  //     followedID: "",
  //   },
  // ],
  followedUsersRedux: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
      state.myPosts = initialState.myPosts;
    },
    setPostsDataRedux: (state, action) => {
      state.value = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    setMyUsers: (state, action) => {
      state.usersRedux = action.payload;
    },
    unfollowUser: (state, action) => {
      state.followedUsersRedux = state.followedUsersRedux.filter(
        (user) => user.uid !== action.payload
      );
    },
    followUser: (state, action) => {
      state.followedUsersRedux = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const {
  login,
  logout,
  setPostsDataRedux,
  setMyPosts,
  setMyUsers,
  followUser,
  unfollowUser,
} = userSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
