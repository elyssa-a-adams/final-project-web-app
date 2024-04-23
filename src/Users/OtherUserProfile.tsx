import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../Snapper/NavBar/navbar";
import "./profile.css";
import * as postsClient from "../Snapper/client";
import { ListGroup } from "react-bootstrap";
import Post from "../Snapper/Post/post";
export default function OtherUserProfile() {
  let { username } = useParams();
  type ProfileType = {
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
  const [viewingProfile, setViewingProfile] = useState<ProfileType>({
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
  const navigate = useNavigate();
  const fetchProfile = async () => {
    if (username) {
      const account = await client.findUsersByUsername(username);
      if (!account) {
        console.log("account");
        navigate("/Home/");
      }
      setProfile(account);
      console.log("account", account);
      fetchPosts(account?.username);
    }
  };
  const fetchViewingProfile = async () => {
    const viewingAccount = await client.profile();
    setViewingProfile(viewingAccount);
  };
  useEffect(() => {
    fetchProfile();
    fetchViewingProfile();
  }, []);
  const [posts, setPosts] = useState<any[]>([]);
  const fetchPosts = async (username: string) => {
    const posts = await postsClient.findPostsForUser(username);
    setPosts(posts);
  };
  const follow = async () => {
    const viewingAccount = await client.profile();
    if (username) {
      console.log("account", viewingAccount);
      if (!viewingAccount) {
        console.log("account");
        navigate("/Opening/");
      } else {
        if (profile?.followers?.includes(viewingAccount.username)) {
          return;
        } else {
          profile?.followers?.push(viewingAccount.username);
          const result = await client.updateUser(profile);
          fetchProfile();
        }
      }
    }
  };
  const unfollow = async () => {
    const viewingAccount = await client.profile();
    if (username) {
      console.log("account", viewingAccount);
      if (!viewingAccount) {
        console.log("account");
        navigate("/Opening/");
      } else {
        const index = profile.followers.indexOf(viewingAccount.username);
        if (index > -1) {
          profile.followers.splice(index, 1);
        }
        const result = await client.updateUser(profile);
        fetchProfile();
      }
    }
  };
  useEffect(() => {
    if (profile?.username !== "") {
      fetchPosts(profile.username);
    }
  }, [profile.username]);

  return (
    <div>
      <NavBar />
      <div className="profileheadbar">
        <h1 className="profileinfo h1">{username}</h1>
        <div className="followerslist">
          <p>Followers</p>
          <p>{profile?.followers.length}</p>
        </div>
        <div className="followerslist">
          <p>Following</p>
          <p>{profile?.following?.length}</p>
        </div>
        {profile.followers.includes(viewingProfile?.username) && (
          <button className="btn btn-primary" onClick={() => unfollow()}>Unfollow</button>
        )}
        {!profile.followers.includes(viewingProfile?.username) && (
          <button className="btn btn-primary" onClick={() => follow()}>
            Follow
          </button>
        )}
      </div>
      {profile && (
        <div className="profileinfo">
          <div className="profilecolumn"></div>
          <div className="homepage">
            <ListGroup style={{ backgroundColor: "white" }}>
              {posts.map((info) => (
                <div key={info._id}>
                  <ListGroup.Item style={{ backgroundColor: "white" }}>
                    <Post post={info} />
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
}
