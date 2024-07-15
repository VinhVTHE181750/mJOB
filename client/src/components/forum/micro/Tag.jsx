import PropTypes from "prop-types";
import { BsGrid1X2, BsPersonFill, BsTagsFill, BsXCircle } from "react-icons/bs";

const Tag = ({ tag, handler, close, type }) => {
  const handleHandler = (e) => {
    e.stopPropagation();
    handler(tag);
  };

  const icon = () => {
    switch (type) {
      case "tag": {
        return <BsTagsFill color="green" />;
      }
      case "user": {
        return <BsPersonFill color="green" />;
      }
      case "category": {
        return <BsGrid1X2 color="green" />;
      }
      default: {
        return null;
      }
    }
  };
  return (
    <span
      className="border bg-info bg-opacity-10 border border-info me-2 p-1 rounded post-tag"
      style={{
        backgroundColor: `lightgray`,
        color: `blue`,
        width: "fit-content",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleHandler}
    >
      <BsTagsFill color="green" /> {tag} {close && <BsXCircle color="red" />}
    </span>
  );
};

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  handler: PropTypes.func,
  close: PropTypes.bool,
  type: PropTypes.string,
};

export default Tag;
