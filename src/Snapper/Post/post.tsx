import { Button, Card, Stack } from "react-bootstrap";
import PostHeader from "./PostHeader/postheader";
import { useState, useEffect } from "react";
function Post( post: any) {
    return (
        <div>
        <Card style={{backgroundColor: "#E8E8E8", maxWidth: "1000px"}}>
      <Card.Header style={{ backgroundColor: "#E8E8E8" }}><PostHeader post={post.post} /></Card.Header>
      <Card.Body>
      <Card.Img src={post.post.image} />
      </Card.Body>
      <Card.Footer className="text-muted">{post.post.caption}</Card.Footer>
    </Card>
    </div>
    );
  };
  export default Post;