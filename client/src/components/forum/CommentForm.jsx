import PropTypes from "prop-types";
import { useState } from "react";
import { Form } from "react-router-dom";
import useWhoAmI from "../../hooks/user/useWhoAmI";
const CommentForm = ({ id }) => {
  const [comment, setComment] = useState("");
  const { userId, username } = useWhoAmI();
  return (
    <>
      
    </>
  );
};

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CommentForm;
