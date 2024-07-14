import axios from "axios";
import {API_URL} from "../..";


// Action Types
const FETCH_VIEWS_REQUEST = 'FETCH_VIEWS_REQUEST';
const FETCH_VIEWS_SUCCESS = 'FETCH_VIEWS_SUCCESS';
const FETCH_VIEWS_FAILURE = 'FETCH_VIEWS_FAILURE';

// Action Creators
export const fetchViewsRequest = () => ({
  type: FETCH_VIEWS_REQUEST,
});

export const fetchViewsSuccess = (views) => ({
  type: FETCH_VIEWS_SUCCESS,
  payload: views,
});

export const fetchViewsFailure = (error) => ({
  type: FETCH_VIEWS_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchViews = () => async (dispatch) => {
  dispatch(fetchViewsRequest());
  try {
    const response = await axios.get(`${API_URL}/forum/views`);
    dispatch(fetchViewsSuccess(response.data));
  } catch (error) {
    dispatch(fetchViewsFailure(error.message));
  }
};

// Reducer
const initialState = {
  loading: false,
  views: [],
  error: '',
};

const viewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VIEWS_SUCCESS:
      return {
        loading: false,
        views: action.payload,
        error: '',
      };
    case FETCH_VIEWS_FAILURE:
      return {
        loading: false,
        views: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default viewsReducer;