import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import useLikesQuery from "../../../hooks/forum/likes/useLikesQuery";
import useLikesUpdate from "../../../hooks/forum/likes/useLikesUpdate";
import useWhoAmI from "../../../hooks/user/useWhoAmI";
import socket from "../../../socket";
import { useNavigate } from "react-router";

const LikeButton = ({ id, type, action, className, ...rest }) => {
  const [refreshFlag, setRefreshFlag] = useState(false); // Add this line
  const { role, loading: userLoading } = useWhoAmI();
  const { likes, dislikes, liked, isDislike, loading: likeLoading } = useLikesQuery(type, id, refreshFlag);
  const { updateLikes } = useLikesUpdate();
  const navigate = useNavigate();

  const handleLikeClick = async () => {
    if (userLoading) return;

    if (role === "GUEST") {
      navigate("/to-login");
      return;
    }

    const like = action === "like";
    await updateLikes(type, id, like);
  };

  useEffect(() => {
    const eventName = `forum/liked/${type}/${id}`;

    const refetchData = () => {
      setRefreshFlag((prevFlag) => !prevFlag);
    };

    socket.on(eventName, refetchData);

    return () => {
      socket.off(eventName, refetchData);
    };
  }, [type, id]);

  let variant;

  if (action === "like") {
    variant = liked && !isDislike ? "success" : "outline-success";
  } else if (action === "dislike") {
    variant = liked && isDislike ? "danger" : "outline-danger";
  }

  if (likeLoading)
    return (
      <Button
        variant={variant}
        disabled
      >
        <Spinner
          animation="border"
          size="sm"
        />
      </Button>
    );

  return (
    <Button
      onClick={handleLikeClick}
      variant={variant}
      disabled={userLoading || likeLoading}
      className={className}
    >
      {action === "like" ? (
        <>
          {likes} <BsHandThumbsUpFill />
        </>
      ) : (
        <>
          {dislikes} <BsHandThumbsDownFill />
        </>
      )}
    </Button>
  );
};

LikeButton.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.oneOf(["like", "dislike"]).isRequired,
  className: PropTypes.string,
  // count: PropTypes.number.isRequired,
};

export default LikeButton;
