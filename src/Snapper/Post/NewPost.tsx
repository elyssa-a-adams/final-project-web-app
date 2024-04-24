import React, { useState } from "react";
import * as client from "../client";
import { Post } from "../client";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post>({
    username: "",
    image: "",
    caption: "",
    location: "",
    comments: [],
  });

  const handleSubmit = async () => {
    try {
      setPost({ ...post, username: "test"});
      const result = await client.createPost(post);
      console.log("result", result);
    } catch (err) {
      setError(
        (err as { response: { data: { message: string } } }).response?.data
          .message
      );
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={post.location as string}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
          />
        </label>
        <label>
          Caption:
          <textarea
            value={post.caption as string}
            onChange={(e) => setPost({ ...post, caption: e.target.value })}
          />
        </label>
        <label>
          Image:
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            required 
            onChange={async (e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setPost({...post, image: reader.result as string});
              };
              reader.readAsDataURL(file);
            
            }}
          />
        </label>
        <button type="button" onClick={handleSubmit}>
          Create Full Post!
        </button>
      </div>
    </div>
  );
}
