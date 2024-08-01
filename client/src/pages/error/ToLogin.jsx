import PropTypes from "prop-types";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { Container, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import { useNavigate } from "react-router";

const ToLogin = ({ path }) => {
  const { loggedIn } = useContext(AuthContext);
  const { role, loading } = useWhoAmI();
  const navigate = useNavigate();

  if (loading)
    return (
      <Container className="d-flex justify-content-center justify-items-center align-items-center">
        <Spinner animation="border" role="status" />
      </Container>
    );

  if (loggedIn) {
    if (path) {
      navigate(path);
    } else {
      if (role) {
        switch (role) {
          case "ADMIN": {
            navigate("/dashboard");
            break;
          }
          default: {
            navigate("/welcome");
          }
        }
      }
    }
  }

  return role !== "GUEST" ? (
    {}
  ) : (
    <Container>
      <h1 className="text-center">Unauthorized</h1>
      <h5>You must login to do this.</h5>
      <NavigateButton path="/login" text="Login" />
    </Container>
  );
};

ToLogin.propTypes = {
  path: PropTypes.string,
};

export default ToLogin;
