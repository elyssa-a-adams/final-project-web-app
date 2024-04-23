import { Routes, Route, Navigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar/navbar";
import { ListGroup } from "react-bootstrap";
import Post from "./Post/post";
import "./snapper.css";
const API_BASE = process.env.REACT_APP_API_BASE;

function Snapper() {
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState({
    username: "ScubaSteve",
    image: "trunkfish.JPG",
    caption: "Some really cool caption about the fish I saw while scuba diving.",
    location: "Your mom's house.",
    comments: [],
  });
  const fetchPosts = async () => {
    const posts = await client.findAllPosts();
    if (window.location.href.indexOf("city") > -1) {
      const city = window.location.href.split("=")[1];
      const newposts = posts.filter((post: { location: string; }) => post.location.toLowerCase().includes(city));
      setPosts(newposts);
      return;
    } else {
      const posts = await client.findAllPosts();
      setPosts(posts);
    }
  };
  useEffect(() => { fetchPosts(); }, []);


  return (
    <div className='Appbackground'>
      <div>
      < NavBar />
      </div>
      <div className="homepage">
      <ListGroup style={{backgroundColor: "white"}}>
      {posts.map((info) => (
            <div key={info._id} >
              <ListGroup.Item style={{backgroundColor: "white"}}><Post post={info} /></ListGroup.Item>
            </div>
          ))}
    </ListGroup>
      </div>
    </div>
  );
}
export default Snapper;
