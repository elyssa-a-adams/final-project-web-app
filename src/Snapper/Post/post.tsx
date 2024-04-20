import { Button, Card, Stack } from "react-bootstrap";
import PostHeader from "./PostHeader/postheader";
import { useState, useEffect } from "react";
import * as client from "../../Users/client";

function Post( post: any) {
  const postInfo = () => {
    console.log("postInfo", post);
    console.log("post picture", `../../images/${post.post.image}`);
    return (
      <div></div>
    )
  };
    return (
        <div>
        <Card style={{backgroundColor: "#E8E8E8", maxWidth: "1000px"}}>
      <Card.Header style={{ backgroundColor: "#E8E8E8" }}><PostHeader post={post.post} /></Card.Header>
      <Card.Body>
      <Card.Img src={`../../images/${post.post.image}`} />
      </Card.Body>
      {postInfo()}
      <Card.Footer className="text-muted">{post.post.caption}</Card.Footer>
    </Card>
    </div>
    );
  };
  export default Post;