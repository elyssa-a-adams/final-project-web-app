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
  const fetchPosts = async () => {
    const posts = await client.findAllPosts();
    if (window.location.href.indexOf("city") > -1) {
      const city = window.location.href.split("=")[1];
      const newposts = posts.filter((post: { location: string; }) => post.location.toLowerCase().includes(city));
      setPosts(newposts);
      return;
    } else {
      setPosts(posts);
    }
  };
  useEffect(() => { fetchPosts(); }, [window.location]);


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
