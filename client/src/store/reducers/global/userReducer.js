import axios from "axios";
import {API_URL} from "../..";


// Default states
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Action Types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// // Additional Action Types
// const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
// const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
// const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

// const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
// const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
// const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

// const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
// const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
// const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

// Action Creators
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// // Create User
// export const createUserRequest = () => ({
//   type: CREATE_USER_REQUEST,
// });

// export const createUserSuccess = (user) => ({
//   type: CREATE_USER_SUCCESS,
//   payload: user,
// });

// export const createUserFailure = (error) => ({
//   type: CREATE_USER_FAILURE,
//   payload: error,
// });

// // Update User
// export const updateUserRequest = () => ({
//   type: UPDATE_USER_REQUEST,
// });

// export const updateUserSuccess = (user) => ({
//   type: UPDATE_USER_SUCCESS,
//   payload: user,
// });

// export const updateUserFailure = (error) => ({
//   type: UPDATE_USER_FAILURE,
//   payload: error,
// });

// // Delete User
// export const deleteUserRequest = () => ({
//   type: DELETE_USER_REQUEST,
// });

// export const deleteUserSuccess = (id) => ({
//   type: DELETE_USER_SUCCESS,
//   payload: id,
// });

// export const deleteUserFailure = (error) => ({
//   type: DELETE_USER_FAILURE,
//   payload: error,
// });

// Thunk Action Creator
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get(`${API_URL}/forum/users`)
      .then((response) => dispatch(fetchUsersSuccess(response.data)))
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(`${API_URL}/forum/users/${userId}`)
      .then((response) => dispatch(fetchUserSuccess(response.data)))
      .catch((error) => dispatch(fetchUserFailure(error.message)));
  };
};

// Create User
// export const createUser = (user) => {
//   return (dispatch) => {
//     dispatch(createUserRequest());
//     axios
//       .post(`${API_URL}/forum/users`, user)
//       .then((response) => dispatch(createUserSuccess(response.data)))
//       .catch((error) => dispatch(createUserFailure(error.message)));
//   };
// };

// Update User
// export const updateUser = (user) => {
//   return (dispatch) => {
//     dispatch(updateUserRequest());
//     axios
//       .put(`${API_URL}/forum/users`, user)
//       .then((response) => dispatch(updateUserSuccess(response.data)))
//       .catch((error) => dispatch(updateUserFailure(error.message)));
//   };
// };

// Delete User
// export const deleteUser = (id) => {
//   return (dispatch) => {
//     dispatch(deleteUserRequest());
//     axios
//       .delete(`${API_URL}/forum/users/${id}`)
//       .then((response) => dispatch(deleteUserSuccess(response.data))) // Assuming you have a deleteUserSuccess action
//       .catch((error) => dispatch(deleteUserFailure(error.message)));
//   };
// };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    // case CREATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     users: [...state.posts, action.payload], // Add the new user to the users array
    //     error: "",
    //   };
    // case CREATE_USER_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case UPDATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     users: state.posts.map((user) =>
    //       user.id === action.payload.id ? action.payload : user
    //     ), // Update the user in the users array
    //     error: "",
    //   };
    // case UPDATE_USER_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     users: state.posts.filter(
    //       (user) => user.id !== action.payload
    //     ), // Remove the deleted user from the users array
    //     error: "",
    //   };
    // case DELETE_USER_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export default usersReducer;
