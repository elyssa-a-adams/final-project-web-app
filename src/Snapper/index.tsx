import { Routes, Route, Navigate } from "react-router-dom";
import * as client from "./client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar/navbar";
import { ListGroup } from "react-bootstrap";
import Post from "./Post/post";
const API_BASE = process.env.REACT_APP_API_BASE;

function Snapper() {
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState({
    userId: "ScubaSteve",
    image: "trunkfish.JPG",
    caption: "Some really cool caption about the fish I saw while scuba diving.",
    location: "Your mom's house.",
    comments: [],
  });
  const fetchPosts = async () => {
    console.log("fetchPosts");
    const posts = await client.findAllPosts();
    setPosts(posts);
    console.log("posts", posts);
  };
  useEffect(() => { fetchPosts(); }, []);


  return (
    <div className='Appbackground'>
      <div>
      < NavBar />
      </div>
      <div>
      <ListGroup style={{backgroundColor: "#0E1428"}}>
      {posts.map((info) => (
            <div key={info._id} >
              <ListGroup.Item style={{backgroundColor: "#0E1428"}}><Post post={info} /></ListGroup.Item>
            </div>
          ))}
    </ListGroup>
      </div>
    </div>
  );
}
export default Snapper;
