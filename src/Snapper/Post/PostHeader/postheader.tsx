import { Stack, Image } from "react-bootstrap";
import './postheader.css';
import * as client from "../../../Users/client";
import { useState, useEffect } from "react";


function PostHeader(post: any) {
  const postInfo = () => {
    console.log("post Header Info", post);
    console.log("post picture", `../../images/${post.image}`);
    return (
      <div></div>
    )
  };
  const [postUser, setPostUser] = useState({
    username: "Mongo Steve",
    password: "steve123",
    firstName: "Steve",
    profilePic: "parrotfish.JPG",
    followers: ["ScubaSally", "ScubaSam"],
    lastName: "Mongo",
    email: "steve@mongo.com",
    dob: "1970-05-29",
    role: "USER"
});
const fetchUser = async () => {
  console.log("fetchPosts");
  const postUser = await client.findUsersByUsername(post.post.username);
  setPostUser(postUser);
  console.log("post User", postUser);
};
useEffect(() => { fetchUser(); }, []);
    return(
      <Stack direction="horizontal" gap={2}>
      <div className="p-2"><Image className="profilePhoto" src={`../../images/${postUser.profilePic}`} roundedCircle width='50px' height='50px' /></div>
      <div className="p-2">{postUser.username}</div>
      {postInfo()}
      <div className="p-3">{post.post.location}</div>
    </Stack>
    );
  };
  export default PostHeader;