import PropTypes from "prop-types";
import {FaTag} from "react-icons/fa6";

const Tag = ({ tag, handler }) => {
  const handleHandler = (e) => {
    e.stopPropagation();
    handler(tag);
  };
  return (
    <span
      className="border bg-info bg-opacity-10 border border-info me-2 p-1 rounded post-tag"
      style={{
        backgroundColor: `lightgray`,
        color: `blue`,
        width: "fit-content",
        cursor: "pointer",
      }}
      onClick={handleHandler}
    >
      <FaTag /> {tag}
    </span>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  handler: PropTypes.func,
};

export default Tag;
