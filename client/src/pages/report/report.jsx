import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  FormGroup,
  FormControl,
  FormLabel,
  FormSelect,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  FormCheck,
} from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ReportForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userInformation, isLogin } = useAuth();
  const userId = userInformation.id;
  const [categoryId, setCategoryId] = useState("");
  const [objectId, setObjectId] = useState("");
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [type, setType] = useState("REPORT");
  const [step, setStep] = useState(0);

  const handleReportSubmit = async (event) => {
    event.preventDefault();
    const data = {
      object: categoryId,
      objectId: parseInt(objectId),
      reason: reason === "other" ? customReason : reason,
      from: isLogin
        ? userId.toString()
        : contactInfo
        ? contactInfo
        : "Anonymous",
      type,
    };
    // Send data to the server
    try {
      const response = await axios.post("/ticket/create", {
        ...data,
        title: "",
        content: "",
      });
      if (response.status === 201) {
        alert("Report successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
    }
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allowRecordIdentity, setAllowRecordIdentity] = useState(false);

  const handleOtherSubmit = async (event) => {
    event.preventDefault();
    if (!allowRecordIdentity) {
      alert("Comfirm rules of mjob");
      return;
    }

    event.preventDefault();
    const data = {
      title,
      content,
      from: isLogin
        ? userId.toString()
        : contactInfo
        ? contactInfo
        : "Anonymous",
      type,
    };
    // Send data to the server
    try {
      const response = await axios.post("/ticket/create", {
        ...data,
      });
      if (response.status === 201) {
        alert(`${type} successfully`);
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
    }
  };

  useEffect(() => {
    const queryType = searchParams.get("type");
    const queryObject = searchParams.get("object");
    const queryObjectId = searchParams.get("objectId");
    const queryContent = searchParams.get("content");
    const queryTitle = searchParams.get("title");
    if (queryType) {
      setStep(1);
      setType(queryType);
    }
    if (queryObjectId) {
      setObjectId(queryObjectId);
    }
    if (queryObject) {
      setCategoryId(queryObject.toLocaleUpperCase());
    }

    if (queryTitle) {
      setTitle(queryTitle);
    }
    if (queryContent) {
      setContent(queryContent);
    }
  }, [searchParams]);

  return (
    <Container>
      {step === 0 ? (
        <>
          <h2>Welcome! What do you want to do?</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>I want create a ticket report</Accordion.Header>
              <Accordion.Body>
                <p>
                  Creating a report involves gathering data, analyzing trends,
                  and synthesizing information to support decision-making. It's
                  a structured way to communicate insights, highlight issues,
                  and recommend actions that can drive strategic improvements
                  and accountability.
                </p>
                <Button
                  onClick={() => {
                    setType("REPORT");
                    setStep(1);
                  }}
                >
                  Proceed
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                I want create a ticket support
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Creating a support system is essential for ensuring customer
                  satisfaction and operational efficiency. It involves setting
                  up reliable channels, training responsive teams, and
                  implementing technologies that facilitate quick resolutions to
                  problems, enhancing overall user experience.
                </p>
                <Button
                  onClick={() => {
                    setType("SUPPORT");
                    setStep(1);
                  }}
                >
                  Proceed
                </Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                I want create a ticket feedback
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Creating a feedback mechanism is crucial for continuous
                  improvement. It encourages open communication, allows insights
                  into user experiences, and helps tailor services or products
                  to better meet customer needs, fostering a culture of
                  transparency and responsiveness.
                </p>
                <Button
                  onClick={() => {
                    setType("FEEDBACK");
                    setStep(1);
                  }}
                >
                  Proceed
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ) : step === 1 && type === "REPORT" ? (
        <Card>
          <CardHeader>
            <h3 style={{ textTransform: "capitalize" }}>Create {type}</h3>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleReportSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Category</FormLabel>
                <FormSelect
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="USER">User</option>
                  <option value="JOB">Job</option>
                  <option value="POST">Post</option>
                </FormSelect>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Object ID</FormLabel>
                <FormControl
                  type="text"
                  value={objectId}
                  onChange={(e) => setObjectId(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Reason</FormLabel>
                <FormSelect
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="inappropriate username">
                    Inappropriate Username
                  </option>
                  <option value="suspicious activities">
                    Suspicious Activities
                  </option>
                  <option value="disrespectful behavior">
                    Disrespectful Behavior
                  </option>
                  <option value="other">Other</option>
                </FormSelect>
                {reason === "other" && (
                  <FormControl
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter custom reason"
                    required
                  />
                )}
              </FormGroup>
              {!isLogin && (
                <FormGroup className="mb-3">
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Enter contact info"
                    required
                  />
                </FormGroup>
              )}
              <Button variant="primary" type="submit">
                Submit Report
              </Button>
            </Form>
          </CardBody>
        </Card>
      ) : step === 1 && (type === "FEEDBACK" || type === "SUPPORT") ? (
        <>
          <Card>
            <CardHeader>
              <h3 style={{ textTransform: "capitalize" }}>Create {type}</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleOtherSubmit}>
                <FormGroup className="mb-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel>Content</FormLabel>
                  <FormControl
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormCheck
                    type="checkbox"
                    label="Allow mJOB to record your identity (which allows faster response from our staff)"
                    checked={allowRecordIdentity}
                    onChange={(e) => setAllowRecordIdentity(e.target.checked)}
                  />
                </FormGroup>
                {allowRecordIdentity && !isLogin && (
                  <FormGroup className="mb-3">
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      required
                    />
                  </FormGroup>
                )}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </>
      ) : null}
    </Container>
  );
};

export default ReportForm;
