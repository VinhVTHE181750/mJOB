import {Container} from "react-bootstrap";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { useAuth } from "../../context/UserContext";

const Logout = () => {
  // const { logout } = useContext(AuthContext);
  const {handleLogout} = useAuth()
  return (
    <Container>
      <h2>Do you want to log out?</h2>
      <NavigateButton path={-1} text="No" />
      <NavigateButton path="/login" variant="danger" action={() => handleLogout()} text="Yes" />
    </Container>
  );
};

export default Logout;
