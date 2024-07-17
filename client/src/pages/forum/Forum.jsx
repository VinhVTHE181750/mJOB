import { Container, Row } from "react-bootstrap";
import ListPost from "../../components/forum/ListPost";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
// import ChatBox from "../../components/forum/ChatBox";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import useWhoAmI from "../../hooks/user/useWhoAmI";

const Forum = () => {
  const { role } = useWhoAmI();
  const [tags, setTags] = useState([]);
  const addSearchTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  const removeSearchTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  return (
    <Container className="">
      <h1>
        {/* <span className="text-logo">m</span>/<span className="text-highlight-1">Forum</span> */}
      </h1>
      <PostSearch
        tagHandler={removeSearchTag}
        tags={tags}
      />
      <div className="d-flex justify-content-center align-items-center mt-2">
        <div className="d-flex flex-row-reverse gap-2">
          {role === "GUEST" ? null : (
            <NavigateButton
              path="/forum/add"
              variant="success"
            >
              <div className="d-flex align-items-center justify-content-center gap-1">
                <FaPlusCircle /> <span className="d-none d-sm-block">Add Post</span>
              </div>
            </NavigateButton>
          )}

          {role === "ADMIN" && (
            <NavigateButton
              path="/forum/categories"
              variant="primary"
            >
              <div className="d-flex align-items-center justify-content-center gap-1">
                <FaGear /> Manage Categories
              </div>
            </NavigateButton>
          )}
        </div>
      </div>
      <ListPost tagHandler={addSearchTag} />
      {/* <ChatBox user={"user1"} /> */}
    </Container>
  );
};

export default Forum;
