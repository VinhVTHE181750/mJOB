import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const NavigateButton = ({
  path,
  text,
  variant,
  confirm,
  confirmMsg,
  className,
  action
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
      {text}
    </Button>
  );
};

export default NavigateButton;
