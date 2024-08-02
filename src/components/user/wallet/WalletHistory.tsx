import React, { useEffect, useState } from 'react';

const WalletHistory = () => {
  const [transactions, setTransactions] = useState([
    {
      _id: '1',
      transactionType: 'credit',
      amount: 35000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      transactionType: 'debit',
      amount: 15000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      transactionType: 'credit',
      amount: 5000,
      createdAt: new Date().toISOString(),
    },
  ]);

//   useEffect(() => {
//     // Fetch transactions data from your API
//     async function fetchTransactions() {
//       const response = await fetch('/api/transactions'); // Update with your API endpoint
//       const data = await response.json();
//       setTransactions(data);
//     }

//     fetchTransactions();
//   }, []);

  return (
    <div className="max-h-60 overflow-y-auto">
      <h2 className="text-lg font-medium mb-2">Wallet History</h2>
      <ul className="space-y-2">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between border-b pb-2">
              <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
              <span className={`${transaction.transactionType=='credit'?'text-green-500':'text-red-500'}`}>{transaction.amount}</span>
              <span>{transaction.transactionType === 'credit' ? 'Credit' : 'Debit'}</span>
            </li>
          ))
        ) : (
          <li>No transactions found</li>
        )}
      </ul>
    </div>
  );
};

export default WalletHistory;
