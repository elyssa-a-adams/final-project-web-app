import { Stack, Image } from "react-bootstrap";
import './postheader.css';

function PostHeader(post: any) {
    return(
      <Stack direction="horizontal" gap={2}>
      <div className="p-2"><Image className="profilePhoto" src={`../../images/${post.image}`} roundedCircle width='50px' height='50px' /></div>
      <div className="p-2">{post.userId}</div>
      <div className="p-3">{post.location}</div>
    </Stack>
    );
  };
  export default PostHeader;