import { Container, Nav, Row, Spinner } from "react-bootstrap";
import ListPost from "../../components/forum/ListPost";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
// import ChatBox from "../../components/forum/ChatBox";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/reducers/forum/postsReducer";
import { BsGraphUp } from "react-icons/bs";

const Forum = () => {
  const { role, loading } = useWhoAmI();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.posts.error);
  const addSearchTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  const removeSearchTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </Container>
    );
  } else if (error) {
    return (
      <Container>
        <h1>Can not connect to the server.</h1>
      </Container>
    );
  } else {
    return (
      <Container className="">
        <h1>{/* <span className="text-logo">m</span>/<span className="text-highlight-1">Forum</span> */}</h1>
        <PostSearch
          tagHandler={removeSearchTag}
          tags={tags}
        />
        <div className="d-flex justify-content-center align-items-center mt-2">
          <div className="d-flex flex-row-reverse gap-2">
            {role === "GUEST" ? null : (
              <>
                <NavigateButton
                  path="/forum/add"
                  variant="success"
                >
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <FaPlusCircle /> <span className="d-none d-sm-block">Add Post</span>
                  </div>
                </NavigateButton>
                <NavigateButton
                  path="/forum/insights"
                  variant="primary"
                >
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <BsGraphUp /> <span className="d-none d-sm-block">Insights</span>
                  </div>
                </NavigateButton>
              </>
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
  }
};

export default Forum;
