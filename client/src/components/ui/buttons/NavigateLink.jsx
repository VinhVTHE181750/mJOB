import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const NavigateLink = ({
  path,
  text,
  variant,
  confirm,
  confirmMsg,
  className,
  action,
}) => {
  const navigate = useNavigate();
  return (
    <a
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
      {text}
    </a>
  );
};

export default NavigateLink;
