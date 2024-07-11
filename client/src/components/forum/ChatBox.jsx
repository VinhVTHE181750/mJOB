// Import necessary modules and components
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import io from "socket.io-client";
import { API_URL } from "../../App";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection inside useEffect
    const newSocket = io(API_URL);
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("forumChat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.off("forumChat");
      newSocket.close();
    };
  }, []);

  // Function to send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && socket) {
      // Emit the message to the server
      socket.emit("forumChat", currentMessage);
      // Clear the input after sending
      setCurrentMessage("");
    }
  };

  // Component render logic remains the same
  return (
    <Container>
      <Row>
        <Col>
          <h2>Chat Box</h2>
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <Form onSubmit={sendMessage}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBox;