import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/forum/postsReducer";
import postCategoriesReducer from "./reducers/forum/postCategoriesReducer";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    postCategories: postCategoriesReducer,
    // other reducers can be added here
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
