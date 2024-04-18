import { Button, Card, Stack } from "react-bootstrap";
import PostHeader from "./PostHeader/postheader";

function Post() {
    return (
        <div>
        <Card style={{backgroundColor: "#E8E8E8", maxWidth: "1000px"}}>
      <Card.Header style={{ backgroundColor: "#E8E8E8" }}><PostHeader/></Card.Header>
      <Card.Body>
      <Card.Img src="../../images/trunkfish.jpeg" />
      </Card.Body>
      <Card.Footer className="text-muted">Some really cool caption about the fish I saw while scuba diving.</Card.Footer>
    </Card>
    </div>
    );
  };
  export default Post;