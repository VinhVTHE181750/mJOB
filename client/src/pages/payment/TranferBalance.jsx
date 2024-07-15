import React, { useState } from 'react';
import useBalancebyId from '../../hooks/payment/useBalancebyID';
import useUpdateUserBalance from '../../hooks/payment/useUpdateUserBalance';

const TransferMoney = () => {
  const [fromUserId, setFromUserId] = useState('');
  const [toUserId, setToUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const { balance: fromUserBalance, loading: fromUserLoading, error: fromUserError } = useBalancebyId(fromUserId);
  const { balance: toUserBalance, loading: toUserLoading, error: toUserError } = useBalancebyId(toUserId);

  const { loading: updateLoading, error: updateError, success: updateSuccess, updateUserBalance } = useUpdateUserBalance();

  const handleTransfer = async () => {
    setTransferError(null);
    setTransferSuccess(false);

    if (fromUserBalance < amount) {
      setTransferError('Insufficient balance.');
      return;
    }

    try {
      await updateUserBalance(fromUserId, fromUserBalance - amount);
      await updateUserBalance(toUserId, toUserBalance + amount);
      setTransferSuccess(true);
    } catch (error) {
      setTransferError('Failed to transfer money.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTransfer();
  };

  return (
    <div>
      <h1>Transfer Money</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From User ID:</label>
          <input
            type="text"
            value={fromUserId}
            onChange={(e) => setFromUserId(e.target.value)}
          />
        </div>
        {fromUserLoading && <p>Loading balance...</p>}
        {fromUserError && <p>Error: {fromUserError.message}</p>}
        {!fromUserLoading && !fromUserError && (
          <p>Balance: {fromUserBalance}</p>
        )}
        <div>
          <label>To User ID:</label>
          <input
            type="text"
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
          />
        </div>
        {toUserLoading && <p>Loading balance...</p>}
        {toUserError && <p>Error: {toUserError.message}</p>}
        {!toUserLoading && !toUserError && (
          <p>Balance: {toUserBalance}</p>
        )}
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" disabled={fromUserLoading || toUserLoading || updateLoading}>
          Transfer
        </button>
      </form>
      {transferError && <p style={{ color: 'red' }}>{transferError}</p>}
      {transferSuccess && <p style={{ color: 'green' }}>Transfer successful!</p>}
    </div>
  );
};

export default TransferMoney;
