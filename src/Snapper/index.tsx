import { Routes, Route, Navigate, useParams } from "react-router-dom";
import * as client from "./client";
import * as usersClient from "../Users/client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar/navbar";
import { ListGroup } from "react-bootstrap";
import Post from "./Post/post";
import "./snapper.css";
const API_BASE = process.env.REACT_APP_API_BASE;

function Snapper() {
  type ProfileType = {
    profilePic: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    role: string;
    followers: string[];
    following: string[];
  };
  const [profile, setProfile] = useState<ProfileType>({
    profilePic: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
    followers: [],
    following: [],
  });
  const fetchProfile = async () => {
    const account = await usersClient.profile();
    console.log("account", account);
    if (!account) {
      return;
    }
    setProfile(account);
  };
  const [posts, setPosts] = useState<any[]>([]);
  const fetchPosts = async () => {
    const posts = await client.findAllPosts();
    if (window.location.href.indexOf("city") > -1) {
      const city = window.location.href.split("=")[1];
      const newposts = posts.filter((post: { location: string; }) => post.location.toLowerCase().includes(city));
      setPosts(newposts);
      return;
    } else if (profile.username !== "") {
        const yourPosts = posts.filter((post: { username: string; }) => post.username === profile.username);
        const followersPosts = posts.filter((post: { username: string; }) => profile.following.includes(post.username));
        const priorityPosts = yourPosts.concat(followersPosts);
        const otherPosts = posts.filter((post: { username: string; caption: string; location: string; }) => !priorityPosts.includes(post));
        const newPosts = priorityPosts.concat(otherPosts);
        setPosts(newPosts);
    }
    else {
      setPosts(posts);
    }
    };
  useEffect(() => {
    fetchProfile();
    fetchPosts();
   }, [window.location, profile.username]);


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
