import { Container } from "react-bootstrap";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <h2>Do you want to log out?</h2>
      <NavigateButton path={-1} text="No" />
      <NavigateButton path="/login" variant="danger" action={() => logout()} text="Yes" />
    </Container>
  );
};

export default Logout;
