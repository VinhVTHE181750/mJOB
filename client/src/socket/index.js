import io from "socket.io-client";
import { API_URL } from "../App";
import store from "./store";
import { fetchPostsRequest } from "../store/reducers/postsReducer";

const socket = io(API_URL);

socket.on("connect", () => {
  console.log("Connected to the server");
});

// Example event listener
socket.on("postsUpdated", () => {
  console.log("Posts updated");
  store.dispatch(fetchPostsRequest());
  // Then fetch posts and dispatch success or failure based on the response
  // This is just an example. You might need to adjust it based on your actual data fetching logic.
});

export default socket;
