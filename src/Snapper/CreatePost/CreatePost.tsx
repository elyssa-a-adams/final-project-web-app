import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userClient from "../../Users/client";
import * as postsClient from "../client";
import NavBar from "../NavBar/navbar";
import { Card } from "react-bootstrap";
import PostHeader from "../Post/PostHeader/postheader";

export default function CreatePost() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const [post, setPost] = useState({
    username: "",
    image: "",
    caption: "",
    location: "",
    comments: [],
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await userClient.profile();
    console.log("account", account);
    if (!account) {
      console.log("account");
      navigate("/Opening/");
    }
    setProfile(account);
    setPost({ ...post, username: account?.username });
  };
  const save = async () => {
    const result = await postsClient.createPost(post);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  function storeImageInPost(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setPost({ ...post, image: reader.result as string });
        console.log(post);
    }
    reader.onerror = error => {
        console.log(error);
    }
  }

  return (
    <div>
       <NavBar />
      <h1 className="profileinfo h1">Profile</h1>
      {profile && (
        <div className="profileinfo">
          <div className="profilecolumn">
          <p className="profilesettings">Caption</p>
          <input
            placeholder="Caption"
            value={post?.caption}
            onChange={(e) =>
              setPost({ ...post, caption: e.target.value })
            }
          />
           <p className="profilesettings">Location</p>
          <input
          placeholder="Location"
            value={post.location}
            onChange={(e) =>
              setPost({ ...post, location: e.target.value })
            }
          />
        <input accept="image/*" type="file" onChange={storeImageInPost} />
          <button onClick={() => save()} className="btn btn-primary">
            Post
            </button>
          </div>
          <div>
        <Card style={{backgroundColor: "#E8E8E8", maxWidth: "1000px"}}>
      <Card.Header style={{ backgroundColor: "#E8E8E8" }}><PostHeader post={post} /></Card.Header>
      <Card.Body>
      <Card.Img src={post.image} />
      </Card.Body>
      <Card.Footer className="text-muted">{post.caption}</Card.Footer>
    </Card>
    </div>
        </div>
      )}
    </div>
  );
}
