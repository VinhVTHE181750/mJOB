import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';
import postCategoriesReducer from './reducers/postCategoriesReducer';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    postCategories: postCategoriesReducer,
    // other reducers can be added here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;