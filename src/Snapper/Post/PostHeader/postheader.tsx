import { Stack, Image } from "react-bootstrap";
import './postheader.css';

function PostHeader(post: any) {
  const postInfo = () => {
    console.log("post Header Info", post);
    console.log("post picture", `../../images/${post.image}`);
    return (
      <div></div>
    )
  };
    return(
      <Stack direction="horizontal" gap={2}>
      <div className="p-2"><Image className="profilePhoto" src={`../../images/${post.post.image}`} roundedCircle width='50px' height='50px' /></div>
      <div className="p-2">{post.post.username}</div>
      {postInfo()}
      <div className="p-3">{post.post.location}</div>
    </Stack>
    );
  };
  export default PostHeader;