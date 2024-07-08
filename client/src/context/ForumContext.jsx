import {createContext} from "react";

const ForumContext = createContext({});

const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostID, setSelectedPostID] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  
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
