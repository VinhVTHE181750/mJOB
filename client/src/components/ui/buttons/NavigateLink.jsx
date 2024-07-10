import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const NavigateLink = ({
  path,
  text,
  confirm,
  confirmMsg,
  className,
  action,
}) => {
  const navigate = useNavigate();
  return (
    <a
      className={className}
      onClick={() => {
        if (action) {
          action();
        }
        if (confirm) {
          const confirmNavigate = window.confirm(confirmMsg);
          if (!confirmNavigate) {
            return;
          }
        }
        navigate(path);
      }}
    >
      {text}
    </a>
  );
};

NavigateLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  confirm: PropTypes.bool,
  confirmMsg: PropTypes.string,
  className: PropTypes.string,
  action: PropTypes.func,
};

export default NavigateLink;
