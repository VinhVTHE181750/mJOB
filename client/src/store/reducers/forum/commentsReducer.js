import axios from "axios";
import {API_URL} from "../..";


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
export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export const fetchCommentRequest = () => ({
  type: FETCH_COMMENT_REQUEST,
});

export const fetchCommentSuccess = (comment) => ({
  type: FETCH_COMMENT_SUCCESS,
  payload: comment,
});

export const fetchCommentFailure = (error) => ({
  type: FETCH_COMMENT_FAILURE,
  payload: error,
});

// Create Comment
export const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST,
});

export const createCommentSuccess = (comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment,
});

export const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

// Update Comment
export const updateCommentRequest = () => ({
  type: UPDATE_COMMENT_REQUEST,
});

export const updateCommentSuccess = (comment) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment,
});

export const updateCommentFailure = (error) => ({
  type: UPDATE_COMMENT_FAILURE,
  payload: error,
});

// Delete Comment
export const deleteCommentRequest = () => ({
  type: DELETE_COMMENT_REQUEST,
});

export const deleteCommentSuccess = (id) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: id,
});

export const deleteCommentFailure = (error) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchComments = () => {
  return (dispatch) => {
    dispatch(fetchCommentsRequest());
    axios
      .get(`${API_URL}/forum/comments`)
      .then((response) => dispatch(fetchCommentsSuccess(response.data)))
      .catch((error) => dispatch(fetchCommentsFailure(error.message)));
  };
};

export const fetchComment = (commentId) => {
  return (dispatch) => {
    dispatch(fetchCommentRequest());
    axios
      .get(`${API_URL}/forum/comments/${commentId}`)
      .then((response) => dispatch(fetchCommentSuccess(response.data)))
      .catch((error) => dispatch(fetchCommentFailure(error.message)));
  };
};

// Create Comment
export const createComment = (comment) => {
  return (dispatch) => {
    dispatch(createCommentRequest());
    axios
      .post(`${API_URL}/forum/comments`, comment)
      .then((response) => dispatch(createCommentSuccess(response.data)))
      .catch((error) => dispatch(createCommentFailure(error.message)));
  };
};

// Update Comment
export const updateComment = (comment) => {
  return (dispatch) => {
    dispatch(updateCommentRequest());
    axios
      .put(`${API_URL}/forum/comments`, comment)
      .then((response) => dispatch(updateCommentSuccess(response.data)))
      .catch((error) => dispatch(updateCommentFailure(error.message)));
  };
};

// Delete Comment
export const deleteComment = (id) => {
  return (dispatch) => {
    dispatch(deleteCommentRequest());
    axios
      .delete(`${API_URL}/forum/comments/${id}`)
      .then((response) => dispatch(deleteCommentSuccess(response.data))) // Assuming you have a deleteCommentSuccess action
      .catch((error) => dispatch(deleteCommentFailure(error.message)));
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
        comments: [...state.posts, action.payload], // Add the new comment to the comments array
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
        comments: state.posts.map((comment) =>
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
        comments: state.posts.filter(
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
