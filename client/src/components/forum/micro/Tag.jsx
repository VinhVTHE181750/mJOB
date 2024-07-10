import PropTypes from "prop-types";

const Tag = ({ tag }) => {

  const addSearchTag = (e) => {
    e.stopPropagation();
    console.log(tag);
  }
    return (
    <span
      className="border bg-info bg-opacity-10 border border-info me-2 p-1 rounded post-tag"
      style={{
        backgroundColor: `lightgray`,
        color: `blue`,
        width: "fit-content",
      }}
      onClick={(e) => addSearchTag(e)}
    >
      #{tag}
    </span>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
