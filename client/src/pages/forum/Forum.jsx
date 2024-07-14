import { Col, Container, Row } from "react-bootstrap";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import ListPost from "../../components/forum/ListPost";
import ChatBox from "../../components/forum/ChatBox";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { FaPlus, FaPlusCircle } from "react-icons/fa";

const Forum = () => {
  const role = "ADMIN";
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
      <div className="d-flex flex-row-reverse gap-2">
        <NavigateButton path="/forum/add" variant="success">
          <div className="d-flex align-items-center justify-content-center gap-1">
            <FaPlusCircle /> Add Post
          </div>
        </NavigateButton>
        {role === "ADMIN" && (
          <NavigateButton path="/forum/categories" variant="primary">
            <div className="d-flex align-items-center justify-content-center gap-1">
              <FaGear /> Manage Categories
            </div>
          </NavigateButton>
        )}
      </div>

      <ListPost tagHandler={addSearchTag} />
      <ChatBox user={"user1"} />
    </Container>
  );
};

export default Forum;
