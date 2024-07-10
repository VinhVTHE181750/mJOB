import { createContext, useEffect } from "react";

const ForumContext = createContext({});

const API_URL = "http://localhost:8000/api/forum";

const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostID, setSelectedPostID] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(async () => {
    const posts = await axios.get(`${API_URL}/posts`);
    setPosts(posts);
    setLoading(false);
    console.table("posts: ", posts);
  }, []);

  return (
    <ForumContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        setLoading,
        selectedPostID,
        setSelectedPostID,
        seletecdPost,
        setSelectedPost,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export { ForumContext, ForumProvider };
