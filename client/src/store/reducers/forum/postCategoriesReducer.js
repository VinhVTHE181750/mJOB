import socket from "../../../socket";
import http from "../../../functions/httpService";

// Action Types
const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

// Action Creators
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await http.get(`/forum/categories`);
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
  socket.on("forum/categories", () => {
    dispatch(fetchCategoriesRequest());
    http
      .get(`/forum/categories`)
      .then((response) => dispatch(fetchCategoriesSuccess(response.data)))
      .catch((error) => dispatch(fetchCategoriesFailure(error.message)));
  });
};

// Reducer
const initialState = {
  loading: false,
  categories: [],
  error: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
        error: "",
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        loading: false,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
