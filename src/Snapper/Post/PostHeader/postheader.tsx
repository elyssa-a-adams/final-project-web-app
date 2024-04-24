import { Stack, Image } from "react-bootstrap";
import './postheader.css';
import * as client from "../../../Users/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function PostHeader(post: any) {
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
  const postUser = await client.findUsersByUsername(post.post.username);
  setPostUser(postUser);
};
useEffect(() => { fetchUser(); }, []);
    return(
      <Stack direction="horizontal" gap={2}>
      <div className="p-2"><Image className="profilePhoto" src={postUser.profilePic} roundedCircle width='50px' height='50px' /></div>
      <div className="p-2"><Link to={`/Profile/${postUser.username}`}>{postUser.username}</Link></div>
      <div className="p-3">{post.post.location}</div>
    </Stack>
    );
  };
  export default PostHeader;