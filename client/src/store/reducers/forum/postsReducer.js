import axios from "axios";
import { API_URL } from "../..";
import socket from "../../../socket";

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

// Thunk Action Creator
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    await axios
      .get(`${API_URL}/forum/posts`)
      .then((response) => dispatch(fetchPostsSuccess(response.data)))
      .catch((error) => dispatch(fetchPostsFailure(error.message)));
    socket.on("forum/posts", async () => {
      dispatch(fetchPostsRequest());
      await axios
        .get(`${API_URL}/forum/posts`)
        .then((response) => dispatch(fetchPostsSuccess(response.data)))
        .catch((error) => dispatch(fetchPostsFailure(error.message)));
    });
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
        posts: action.payload.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
        error: "",
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
