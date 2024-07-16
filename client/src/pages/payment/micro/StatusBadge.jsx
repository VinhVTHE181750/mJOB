import PropTypes from "prop-types";
import { memo } from "react";
import { BsCircleFill, BsThreeDotsVertical } from "react-icons/bs";

const StatusBadge = memo(function StatusBadge({ status }) {
  switch (status) {
    case "SUCCESS":
      return (
        <>
          <BsCircleFill color="green" /> Success
        </>
      );
    case "FAIL":
      return (
        <>
          <BsCircleFill color="red" /> Failed
        </>
      );
    case "PENDING":
      return (
        <>
          <BsCircleFill color="orange" /> Pending
        </>
      );
    default:
      return (
        <>
          <BsThreeDotsVertical /> Unknown
        </>
      );
  }
});

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
