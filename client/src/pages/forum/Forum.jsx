import { Col, Container, Row } from "react-bootstrap";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import ListPost from "../../components/forum/ListPost";
import ChatBox from "../../components/forum/ChatBox";
import { useState } from "react";

const Forum = () => {
  const [tags, setTags] = useState([]);
  const addSearchTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      console.log("added " + tag);
    }
  };
  const removeSearchTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
    console.log("removed " + tag);
  };
  return (
    <Container className="d-none d-sm-block">
      <PostSearch tagHandler={removeSearchTag} tags={tags} />
      <div className="d-flex flex-row-reverse">
        <NavigateButton path="/forum/add" variant="success" text="Add Post">
          Navigate
        </NavigateButton>
      </div>

      <ListPost tagHandler={addSearchTag} />
      <ChatBox user={"user1"} />
    </Container>
  );
};

export default Forum;
