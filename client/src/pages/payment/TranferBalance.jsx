import React, { useState } from 'react';
import { Card, Form, Button , Row, Col, Container, Alert} from 'react-bootstrap';
import useBalancebyId from '../../hooks/payment/useBalancebyID';
import useUpdateUserBalance from '../../hooks/payment/useUpdateUserBalance';
import useInsertPaymentHistory from '../../hooks/payment/useInsertPaymentHistory';
import useCheckUserTranferTo from '../../hooks/payment/useCheckUserTranferTo';
import useTranfer from '../../hooks/payment/useTranfer';
import { useNavigate } from 'react-router-dom';
import Transfer from '../../components/payment/Transfer';
// import useBalance from '../../hooks/payment/useBalance';

const TransferMoney = () => {
  const navigate = useNavigate();
  const [fromUserId, setFromUserId] = useState(''); // Assume you will set this properly
  const [toUserId, setToUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [toUserName, setToUserName] = useState('');

  const { info: fromUserInfo, loading: fromUserLoading, error: fromUserError } = useBalancebyId(1);
  const { info: toUserInfo, loading: toUserLoading, error: toUserError } = useBalancebyId(2);
  const { loading: updateLoading, error: updateError, success: updateSuccess, updateUserBalance } = useUpdateUserBalance();
  const { loading, error, success, insertPaymentHistory } = useInsertPaymentHistory();
  const { tranfer } = useTranfer();
  
  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleTransfer = async () => {
    setTransferError(null);
    setTransferSuccess(false);

    if (fromUserInfo.balance < amount) {
      setTransferError('Insufficient balance.');
      return;
    }

    const paymentData = {
      from: '1',
      to: '2',
      amount: amount,
      onPlatform: true,
      action: 'Transfer',
      status: 'Success',
      createdAt: new Date().toISOString(),
      userId: fromUserInfo.user_id,
    };

    // console.log(paymentData);
    
    try {
      await updateUserBalance(fromUserInfo.user_id, (fromUserInfo.balance - amount));
      await updateUserBalance(toUserInfo.user_id, toUserInfo.balance + amount);
      await insertPaymentHistory(paymentData);
      alert('Transfer successful.');
      location.reload();
    } catch (error) {
      setTransferError('Failed to transfer money.');
    }
  };

  // const handleTransfer = (to, amount) => {
  //   try {
  //     const tx = tranfer(to, amount);
  //     if (!tx.loading) {
  //       setBalance(tx.info.balance);
  //       setMessage(tx.info.message);
  //     }
  //     // console.log(tx);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleTransfer(toUserInfo.username, amount);
  };

  return (
    <div>
      {/* <Transfer /> */}
      <Container className="mt-5">
      <h1 className="text-center mb-4">Transfer Money</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>From</h3>
          <Card className="mb-4">
            <Card.Body>
              <Card.Text><strong>User ID:</strong> {fromUserInfo?.user_id}</Card.Text>
              <Card.Text><strong>Username:</strong> {fromUserInfo?.username}</Card.Text>
              <Card.Text>
                {fromUserLoading && <p>Loading balance...</p>}
                {fromUserError && <p className="text-danger">Error: {fromUserError.message}</p>}
                {!fromUserLoading && !fromUserError && (
                  <p><strong>Balance:</strong> {fromUserInfo?.balance}</p>
                )}
              </Card.Text>
            </Card.Body>
          </Card>

          {!isVerified ? (
            <Form onSubmit={handleVerify}>
              <Form.Group controlId="toUserId">
                <Form.Label>User ID to Transfer To:</Form.Label>
                <Form.Control
                  type="text"
                  value={toUserId}
                  onChange={(e) => setToUserId(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={toUserLoading} className="mt-2">
                Verify User
              </Button>
              {toUserLoading && <p>Verifying...</p>}
              {toUserError && <p className="text-danger">Error: {toUserError.message}</p>}
            </Form>
          ) : (
            <>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                </Form.Group>
                
              <h3 className="mt-3">Transfer To</h3>
              {toUserInfo?.user_id && (
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text><strong>ID:</strong> {toUserInfo.user_id}</Card.Text>
                    <Card.Text><strong>Username:</strong> {toUserInfo.username}</Card.Text>
                  </Card.Body>
                </Card>
              )}

              <div className='d-flex justify-content-center'>
              <Button variant="primary" type="submit" disabled={updateLoading} className="mt-2">
                  Transfer
                </Button>
              </div>
              </Form>
            </>
          )}

          {transferError && <p className="text-danger mt-3">{transferError}</p>}
          {transferSuccess && <p className="text-success mt-3">Transfer successful!</p>}
        </Col>
      </Row>
    </Container>
    </div >
  );
};

export default TransferMoney;
