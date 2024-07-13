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

  const [sortTerms, setSortTerms] = useState({
    updatedAt: false,
    createdAt: false,
    likes: false,
    comments: false,
    views: false,
    desc: false,
  });

  const setUser = (username) => {
    setSearchTerms({ ...searchTerms, user: username });
  };

  useEffect(() => {}, [searchTerms]);

  useEffect(() => {
    if (!searchTerms || searchTerms.tags.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(
      posts.filter((post) => {
        if (searchTerms.tags.length === 0) return true;
        let tags = post.tags.split(",");
        return searchTerms.tags.every((tag) => tags.includes(tag));
      })
    );
  }, [posts, searchTerms]);

  useEffect(() => {
    // sort the filteredPosts based on the post.updatedAt
    setFilteredPosts(
      filteredPosts.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
    );
  }, [filteredPosts]);

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
    });
  };

  const deletePost = (id) => {
    // delete post
  };

  return (
    <ForumContext.Provider
      value={{
        searchTerms,
        addTag,
        removeTag,
        posts: filteredPosts,
        categoryOf,
        clearSearchTerms,
        setUser,
        categories,
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
