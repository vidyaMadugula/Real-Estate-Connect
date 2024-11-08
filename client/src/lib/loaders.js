// import { defer } from "react-router-dom";
// import apiRequest from "./apiRequest";

// export const singlePageLoader = async ({ request, params }) => {
//   const res = await apiRequest.get("/posts/" + params.id);
//   return res.data;
// };
// export const listPageLoader = async ({ request, params }) => {
//   const query = request.url.split("?")[1];
//   const postPromise = apiRequest.get("/posts?" + query);
//   return defer({
//     postResponse: postPromise,
//   });
// };

// export const profilePageLoader = async () => {
//   const postPromise = apiRequest.get("/api/users/profilePosts");
//   const chatPromise = apiRequest.get("/api/chats");
//   return defer({
//     postResponse: postPromise,
//     chatResponse: chatPromise,
//   });
// };
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
  // const postPromise = apiRequest("/users/profilePosts");
  const postPromise = apiRequest("/users/profilePosts", { withCredentials: true });
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
