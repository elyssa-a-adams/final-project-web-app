import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const POSTS_API = `${API_BASE}/api/posts`;
const api = axios.create({
  withCredentials: true
});
export interface Post {
  id: { type: String, required: true},
  username: { type: String, required: true},
  image: String,
  caption: Date,
  location: Date,
  comments: [],
};
export const deletePost = async (postId: string) => {
  const response = await api
    .delete(`${POSTS_API}/${postId}`);
  return response.data;
};
export const createCourse = async (postId: any, post: any) => {
    console.log("createCourse", postId, post);
    const response = await api.post(
      `${POSTS_API}`,
      post
    );
    console.log("create response", response.data);
    return response.data;
  };  
export const findCommentsForPost = async (postId: string) => {
  const response = await api
    .get(`${POSTS_API}/${postId}/comments`);
  return response.data;
};
export const findAllPosts = async () => {
    console.log("findAllPosts");
    const response = await api
      .get(`${POSTS_API}`);
      console.log("response", response.data);
    return response.data;
  };
export const updatePost = async (post: { _id: any; }) => {
    const response = await api.
      put(`${POSTS_API}/${post._id}`, post);
    return response.data;
  };
  
