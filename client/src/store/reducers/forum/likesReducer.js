import axios from "axios";
import {API_URL} from "../..";


// Action Types
const FETCH_LIKES_REQUEST = 'FETCH_LIKES_REQUEST';
const FETCH_LIKES_SUCCESS = 'FETCH_LIKES_SUCCESS';
const FETCH_LIKES_FAILURE = 'FETCH_LIKES_FAILURE';

// Action Creators
export const fetchLikesRequest = () => ({
  type: FETCH_LIKES_REQUEST,
});

export const fetchLikesSuccess = (likes) => ({
  type: FETCH_LIKES_SUCCESS,
  payload: likes,
});

export const fetchLikesFailure = (error) => ({
  type: FETCH_LIKES_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchLikes = () => async (dispatch) => {
  dispatch(fetchLikesRequest());
  try {
    const response = await axios.get(`${API_URL}/forum/likes`);
    dispatch(fetchLikesSuccess(response.data));
  } catch (error) {
    dispatch(fetchLikesFailure(error.message));
  }
};

// Reducer
const initialState = {
  loading: false,
  likes: [],
  error: '',
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIKES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIKES_SUCCESS:
      return {
        loading: false,
        likes: action.payload,
        error: '',
      };
    case FETCH_LIKES_FAILURE:
      return {
        loading: false,
        likes: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likesReducer;