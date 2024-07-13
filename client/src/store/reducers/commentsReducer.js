import axios from "axios";
import {API_URL} from "..";

// Default states
const initialState = {
  loading: false,
  comments: [],
  error: "",
};

// Action Types
const FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
const FETCH_COMMENTS_FAILURE = "FETCH_COMMENTS_FAILURE";

const FETCH_COMMENT_REQUEST = "FETCH_COMMENT_REQUEST";
const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS";
const FETCH_COMMENT_FAILURE = "FETCH_COMMENT_FAILURE";

// Additional Action Types
const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

// Action Creators
export const fetchPostsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchPostsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export const fetchPostRequest = () => ({
  type: FETCH_COMMENT_REQUEST,
});

export const fetchPostSuccess = (comment) => ({
  type: FETCH_COMMENT_SUCCESS,
  payload: comment,
});

export const fetchPostFailure = (error) => ({
  type: FETCH_COMMENT_FAILURE,
  payload: error,
});

// Create Post
export const createPostRequest = () => ({
  type: CREATE_COMMENT_REQUEST,
});

export const createPostSuccess = (comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment,
});

export const createPostFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

// Update Post
export const updatePostRequest = () => ({
  type: UPDATE_COMMENT_REQUEST,
});

export const updatePostSuccess = (comment) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment,
});

export const updatePostFailure = (error) => ({
  type: UPDATE_COMMENT_FAILURE,
  payload: error,
});

// Delete Post
export const deletePostRequest = () => ({
  type: DELETE_COMMENT_REQUEST,
});

export const deletePostSuccess = (id) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: id,
});

export const deletePostFailure = (error) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    axios
      .get(`${API_URL}/forum/comments`)
      .then((response) => dispatch(fetchPostsSuccess(response.data)))
      .catch((error) => dispatch(fetchPostsFailure(error.message)));
  };
};

export const fetchPost = (commentId) => {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    axios
      .get(`${API_URL}/forum/comments/${commentId}`)
      .then((response) => dispatch(fetchPostSuccess(response.data)))
      .catch((error) => dispatch(fetchPostFailure(error.message)));
  };
};

// Create Post
export const createPost = (comment) => {
  return (dispatch) => {
    dispatch(createPostRequest());
    axios
      .comment(`${API_URL}/forum/comments`, comment)
      .then((response) => dispatch(createPostSuccess(response.data)))
      .catch((error) => dispatch(createPostFailure(error.message)));
  };
};

// Update Post
export const updatePost = (comment) => {
  return (dispatch) => {
    dispatch(updatePostRequest());
    axios
      .put(`${API_URL}/forum/comments`, comment)
      .then((response) => dispatch(updatePostSuccess(response.data)))
      .catch((error) => dispatch(updatePostFailure(error.message)));
  };
};

// Delete Post
export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostRequest());
    axios
      .delete(`${API_URL}/forum/comments/${id}`)
      .then((response) => dispatch(deletePostSuccess(response.data))) // Assuming you have a deletePostSuccess action
      .catch((error) => dispatch(deletePostFailure(error.message)));
  };
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
        error: "",
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        loading: false,
        comments: [],
        error: action.payload,
      };

    case FETCH_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENT_SUCCESS:
      return {
        loading: false,
        comments: action.payload,
        error: "",
      };
    case FETCH_COMMENT_FAILURE:
      return {
        loading: false,
        comments: [],
        error: action.payload,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload], // Add the new comment to the comments array
        error: "",
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ), // Update the comment in the comments array
        error: "",
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ), // Remove the deleted comment from the comments array
        error: "",
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentsReducer;
