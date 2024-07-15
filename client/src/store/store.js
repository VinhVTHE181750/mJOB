import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './reducers/forum/postsReducer';
import postCategoriesReducer from './reducers/forum/postCategoriesReducer';
import commentsReducer from './reducers/forum/commentsReducer';
import likesReducer from './reducers/forum/likesReducer';
import viewsReducer from './reducers/forum/viewsReducer';
import postReducer from './reducers/forum/postReducer';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    postCategories: postCategoriesReducer,
    comments: commentsReducer,
    likes: likesReducer,
    views: viewsReducer,
    post: postReducer
    // other reducers can be added here
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;