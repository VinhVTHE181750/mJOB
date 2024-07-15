import PropTypes from "prop-types";

const Count = ({ count, icon }) => {
  return (
    <div
      className="ms-2"
      style={{ textAlign: "right", float: "right", fontSize: "small" }}
    >
      <span>
        {count} {icon}
      </span>
    </div>
  );
};

Count.propTypes = {
  count: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Count;
