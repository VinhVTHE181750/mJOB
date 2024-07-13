import axios from "axios";
import {API_URL} from "..";

// Default states
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// Action Types
const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

const FETCH_POST_REQUEST = "FETCH_POST_REQUEST";
const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";

// Additional Action Types
const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

// Action Creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPostRequest = () => ({
  type: FETCH_POST_REQUEST,
});

export const fetchPostSuccess = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

export const fetchPostFailure = (error) => ({
  type: FETCH_POST_FAILURE,
  payload: error,
});

// Create Post
export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

// Update Post
export const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST,
});

export const updatePostSuccess = (post) => ({
  type: UPDATE_POST_SUCCESS,
  payload: post,
});

export const updatePostFailure = (error) => ({
  type: UPDATE_POST_FAILURE,
  payload: error,
});

// Delete Post
export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});

export const deletePostSuccess = (id) => ({
  type: DELETE_POST_SUCCESS,
  payload: id,
});

export const deletePostFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    axios
      .get(`${API_URL}/forum/posts`)
      .then((response) => dispatch(fetchPostsSuccess(response.data)))
      .catch((error) => dispatch(fetchPostsFailure(error.message)));
  };
};

export const fetchPost = (postId) => {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    axios
      .get(`${API_URL}/forum/posts/${postId}`)
      .then((response) => dispatch(fetchPostSuccess(response.data)))
      .catch((error) => dispatch(fetchPostFailure(error.message)));
  };
};

// Create Post
export const createPost = (post) => {
  return (dispatch) => {
    dispatch(createPostRequest());
    axios
      .post(`${API_URL}/forum/posts`, post)
      .then((response) => dispatch(createPostSuccess(response.data)))
      .catch((error) => dispatch(createPostFailure(error.message)));
  };
};

// Update Post
export const updatePost = (post) => {
  return (dispatch) => {
    dispatch(updatePostRequest());
    axios
      .put(`${API_URL}/forum/posts`, post)
      .then((response) => dispatch(updatePostSuccess(response.data)))
      .catch((error) => dispatch(updatePostFailure(error.message)));
  };
};

// Delete Post
export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostRequest());
    axios
      .delete(`${API_URL}/forum/posts/${id}`)
      .then((response) => dispatch(deletePostSuccess(response.data))) // Assuming you have a deletePostSuccess action
      .catch((error) => dispatch(deletePostFailure(error.message)));
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: "",
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };

    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: "",
      };
    case FETCH_POST_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload], // Add the new post to the posts array
        error: "",
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ), // Update the post in the posts array
        error: "",
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload), // Remove the deleted post from the posts array
        error: "",
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;