
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts", { withCredentials: true });
  return defer({
    postResponse: postPromise,
  });
};
export const homePageLoader = async ({ request }) => {
  // Check if the user is logged in and fetch their posts
  const postPromise = apiRequest("/posts");
  return defer({
    postResponse: postPromise,
  });
};

export const chatPageLoader = async () => {
  const chatPromise = apiRequest("/chats");
  return defer({
    chatResponse: chatPromise,
  });
};
