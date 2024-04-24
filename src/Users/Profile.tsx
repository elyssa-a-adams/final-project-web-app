import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Snapper/NavBar/navbar";
import "./profile.css";
import * as postsClient from "../Snapper/client";
import { ListGroup } from "react-bootstrap";
import Post from "../Snapper/Post/post";
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log("account", account);
    if (!account) {
      console.log("account");
      navigate("/Opening/");
    }
    setProfile(account);
    fetchPosts(account?.username);
  };
  const signout = async () => {
    const result = await client.signout();
    navigate("/Home/");
  };
  const save = async () => {
    const result = await client.updateUser(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState({
    username: "ScubaSteve",
    image: "trunkfish.JPG",
    caption: "Some really cool caption about the fish I saw while scuba diving.",
    location: "Your mom's house.",
    comments: [],
  });
  const fetchPosts = async (username: string) => {
      const posts = await postsClient.findPostsForUser(username);
      setPosts(posts);
  };
  useEffect(() => {
    if(profile?.username !== ""){
      fetchPosts(profile.username);
    }
  }, [profile.username]);
  
  return (
    <div>
       <NavBar />
      <h1 className="profileinfo h1">Profile</h1>
      {profile && (
        <div className="profileinfo">
          <div className="profilecolumn">
          <p className="profilesettings">Username</p>
          <input
            placeholder="Username"
            value={profile?.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
           <p className="profilesettings">Password</p>
          <input
          placeholder="Password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <p className="profilesettings">Name</p>
          <div className="profileName">
          <input
          placeholder="First Name"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
          placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
            </div>
            <p className="profilesettings">Birthday</p>
          <input
            value={profile.dob}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <p className="profilesettings">Email</p>
          <input
          placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <p className="profilesettings">User Type</p>
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="btn btn-primary profilebutton" onClick={() => save()}> Save </button>
          <button className="btn btn-primary profilebutton" onClick={() => signout()}>Signout</button>
          {profile.role === "ADMIN" && (<Link
            to="/Users/"
            className="btn btn-warning w-100"
          >
            Users
          </Link>)
            }
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
      )}
    </div>
  );
}
