import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {API_URL} from '../../App';
import useWebSocket from '../../hooks/forum/useWebSocket';

const ChatBox = ({ user }) => {
  const [newMessage, setNewMessage] = useState('');
  const { messages, onlineUsers, sendMessage } = useWebSocket(API_URL, user);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { user, text: newMessage };
      sendMessage(message);
      setNewMessage('');
    }
  };

  return (
    <>
      <Row className="border">
        <Col className="border" md={9}>
          <Row className="border">
            {messages.map((msg, index) => (
              <p key={index}>{`> ${msg.user}: ${msg.text}`}</p>
            ))}
          </Row>
          <Row className="text-danger">
            ⚠ Beware, this is a public chat room. Do not share personal information.
          </Row>
          <Row className="border border-primary">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Say something..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </Row>
        </Col>
        <Col className="border" md={3}>
          <h5>Online users</h5>
          {onlineUsers.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ChatBox;
