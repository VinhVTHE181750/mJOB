import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { Container } from "react-bootstrap";

const ToLogin = () => {
  return (
    <Container>
      <h1 className="text-center">Unauthorized</h1>
      <h5>You must login to do this.</h5>
      <NavigateButton path="/login" text="Login" />
    </Container>
  );
};

export default ToLogin;