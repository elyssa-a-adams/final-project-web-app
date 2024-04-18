import { Stack, Image } from "react-bootstrap";
import './postheader.css';

function PostHeader() {
    return(
      <Stack direction="horizontal" gap={2}>
      <div className="p-2"><Image className="profilePhoto" src="../../images/trunkfish.jpeg" roundedCircle width='50px' height='50px' /></div>
      <div className="p-2">Username</div>
      <div className="p-3">Location</div>
    </Stack>
    );
  };
  export default PostHeader;