import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { BsBack, BsFloppy2, BsFront, BsTrash3 } from "react-icons/bs";
import { API_URL } from "../../App";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { ForumContext } from "../../context/ForumContext";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import http from "../../functions/httpService";

const ManageCategories = () => {
  const { categories } = useContext(ForumContext);
  const [cts, setCts] = useState([]);
  const { role, loading } = useWhoAmI();
  const [visible, setVisible] = useState(false);

  const updateCategory = (category) => async () => {
    // // console.log(category);
    await http.put(`/forum/categories`, {
      id: category.id,
      name: category.name,
      enabled: category.enabled,
      bgColor: category.bgColor,
      fgColor: category.fgColor,
    });
  };

  const createCategory = async () => {
    await http.post(`/forum/categories`, {
      name: "New Category",
      enabled: true,
      bgColor: "ffffff",
      fgColor: "000000",
    });
  };

  useEffect(() => {
    if (loading) return;
    if (role === "ADMIN") {
      setVisible(true);
    }
    // console.log(role);
  }, [role, loading]);

  const deleteCategory = (category) => async () => {
    // console.log(category);
    await axios.delete(`${API_URL}/forum/categories/${category.id}`);
  };

  useEffect(() => {
    setCts(categories);
  }, [categories]);

  if (loading)
    return (
      <Container className="d-flex justify-content-center justify-items-center align-items-center">
        <Spinner
          animation="border"
          role="status"
        />
      </Container>
    );
  else
    return visible ? (
      <Container>
        <NavigateButton
          path="/forum"
          text="Back"
        />
        <h1 className="text-center fs-1 fw-bold">Manage Categories</h1>
        <FloatingLabel
          className="mb-2"
          controlId="floatingInput"
          label="Search"
        >
          <Form.Control
            type="text"
            placeholder="Search"
          />
        </FloatingLabel>
        <Button
          className="d-block mx-auto"
          variant="success"
          onClick={createCategory}
        >
          Create Category
        </Button>
        {cts.length === 0 && <h3 className="text-center fs-3 fw-bold ">No categories found</h3>}
        {cts.map((category) => (
          <Row
            key={category.id}
            className="d-flex border-bottom mb-2 align-items-center"
          >
            <Col xs="auto me-4">
              <Form.Control
                type="text"
                value={category.name}
                style={{
                  width: "200px",
                  display: "inline-block",
                  backgroundColor: `#${category.bgColor}`,
                  color: `#${category.fgColor}`,
                }}
                onChange={(e) => {
                  setCts(cts.map((ct) => (ct.id === category.id ? { ...ct, name: e.target.value } : ct)));
                }}
              />
            </Col>
            <Col xs="auto me-4 align-items-center justify-content-center">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`enabled-switch-${category.id}`}
                  checked={category.enabled}
                  onChange={(e) => {
                    setCts(cts.map((ct) => (ct.id === category.id ? { ...ct, enabled: e.target.checked } : ct)));
                  }}
                />
              </div>
            </Col>
            <Col xs="2 me-4 ms-auto">
              <Row>
                <div className="d-flex gap-2">
                  <BsFront
                    color="blue"
                    style={{
                      minHeight: "10px",
                      minWidth: "10px",
                    }}
                  />
                  Foreground
                </div>
              </Row>
              <Row>
                <input
                  type="color"
                  value={`#${category.fgColor}`}
                  style={{
                    height: "40px",
                    minWidth: "100px",
                    border: "none",
                    marginLeft: "0px",
                    paddingLeft: "0px",
                  }}
                  onChange={(e) => {
                    setCts(cts.map((ct) => (ct.id === category.id ? { ...ct, fgColor: e.target.value.substring(1) } : ct)));
                  }}
                />
              </Row>
            </Col>
            <Col xs="2 me-4 ms-auto">
              <Row>
                <div className="d-flex gap-2">
                  <BsBack
                    color="blue"
                    className=""
                    style={{
                      minHeight: "10px",
                      minWidth: "10px",
                    }}
                  />
                  Background
                </div>
              </Row>
              <Row>
                <input
                  type="color"
                  value={`#${category.bgColor}`}
                  style={{
                    // width: "100px",
                    height: "40px",
                    minWidth: "100px",
                    border: "none",
                    marginLeft: "0px",
                    paddingLeft: "0px",
                  }}
                  onChange={(e) => {
                    setCts(cts.map((ct) => (ct.id === category.id ? { ...ct, bgColor: e.target.value.substring(1) } : ct)));
                  }}
                />
              </Row>
            </Col>
            <Col
              xs="auto"
              className="ms-auto"
            >
              <div className="d-flex align-items-center gap-1">
                <Button
                  variant="success"
                  className="me-2 align-items-center gap-1"
                  onClick={updateCategory(category)}
                >
                  <BsFloppy2 /> Save
                </Button>
                <Button
                  variant="danger"
                  className=" align-items-center gap-1"
                  onClick={deleteCategory(category)}
                >
                  <BsTrash3 /> Delete
                </Button>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    ) : (
      <h1 className="text-center fs-1 fw-bold">You are not authorized to view this page</h1>
    );
};

export default ManageCategories;
