import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const NavigateButton = ({
  path,
  icon,
  text,
  variant,
  confirm,
  confirmMsg,
  className,
  action,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      className={className}
      variant={variant}
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
      {children}
      {text}
    </Button>
  );
};

NavigateButton.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node,
  text: PropTypes.string,
  variant: PropTypes.string,
  confirm: PropTypes.bool,
  confirmMsg: PropTypes.string,
  className: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.node,
};

export default NavigateButton;
