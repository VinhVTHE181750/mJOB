import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../store/reducers/postsReducer";
import {fetchCategories} from "../store/reducers/postCategoriesReducer";

const ForumContext = createContext({});

const ForumProvider = ({ children }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const categories = useSelector((state) => state.postCategories.categories);

  // if possible, implement username mentions

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [searchTerms, setSearchTerms] = useState({
    title: "",
    content: "",
    category: {},
    tags: [],
    user: "",
  });

  // can be featured, newest, oldest
  const [sortOption, setSortOption] = useState("newest");

  const setUser = (username) => {
    setSearchTerms({ ...searchTerms, user: username });
  };

  const unsetUser = () => {
    setSearchTerms({ ...searchTerms, user: "" });
  };

  const setTitle = (title) => {
    setSearchTerms({ ...searchTerms, title });
  };

  const unsetTitle = () => {
    setSearchTerms({ ...searchTerms, title: "" });
  };

  const setContent = (content) => {
    setSearchTerms({ ...searchTerms, content });
  };

  const unsetContent = () => {
    setSearchTerms({ ...searchTerms, content: "" });
  };

  const setCategory = (category) => {
    setSearchTerms({ ...searchTerms, category });
  };

  const unsetCategory = () => {
    setSearchTerms({ ...searchTerms, category: {} });
  };


  useEffect(() => {}, [searchTerms]);

  useEffect(() => {
    // Filter posts based on search terms
    let filtered = posts.filter((post) => {
      const matchTitle = searchTerms.title ? post.title.includes(searchTerms.title) : true;
      const matchContent = searchTerms.content ? post.content.includes(searchTerms.content) : true;
      // const matchCategory = searchTerms.category.id ? post.categoryId === searchTerms.category.id : true;
      const matchCategory = true;
      // const matchUser = searchTerms.user ? post.user === searchTerms.user : true;
      const matchUser = true;
      const matchTags = searchTerms.tags.length > 0 ? searchTerms.tags.every(tag => post.tags.includes(tag)) : true;
      return matchTitle && matchContent && matchCategory && matchUser && matchTags;
    });
  
    // Sort posts based on sortOption
    switch (sortOption) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "featured":
        // Assuming there's a way to determine if a post is featured. This is just a placeholder.
        filtered.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
      default:
        break;
    }
  
    // Update filteredPosts state
    setFilteredPosts(filtered);
  }, [posts, searchTerms, sortOption]);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [])

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const addTag = (tag) => {
    if (!searchTerms.tags.includes(tag)) {
      setSearchTerms({ ...searchTerms, tags: [...searchTerms.tags, tag] });
    }
  };

  const removeTag = (tag) => {
    setSearchTerms({
      ...searchTerms,
      tags: searchTerms.tags.filter((t) => t !== tag),
    });
  };

  const categoryOf = (postId) => {
    return categories.find(
      (category) =>
        category.id === posts.find((post) => post.id === postId).PostCategoryId
    );
  };

  const clearSearchTerms = () => {
    setSearchTerms({
      title: "",
      content: "",
      category: {},
      tags: [],
      user: "",
    });
  };

  const deletePost = (id) => {
    // delete post
  };

  return (
    <ForumContext.Provider
      value={{
        posts: filteredPosts,
        categories,
        categoryOf,
        searchTerms,
        clearSearchTerms,
        addTag,
        removeTag,
        setUser,
        unsetUser,
        setTitle,
        unsetTitle,
        setContent,
        unsetContent,
        setCategory,
        unsetCategory,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

ForumProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ForumContext, ForumProvider };
