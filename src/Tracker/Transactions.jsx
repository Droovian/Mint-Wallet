import { useState } from 'react';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Transactions = () => {
  const { transactions, transactionTotals } = useGetTransactions();

  const handleDelete = async (transactionId) => {
    try {
      const transactionDocRef = doc(db, 'transactions', transactionId);
      await deleteDoc(transactionDocRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="h-screen bg-white p-4 shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="mb-2 flex justify-between items-center">
            <div>
              <h3 className="text-sm md:text-lg font-semibold">{transaction.description}</h3>
              <p className="text-gray-600">
                ₹{transaction.Amount} • {transaction.type}
              </p>
            </div>
            <button
              onClick={() => handleDelete(transaction.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none text-sm mr-3 md:text-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr className="mt-5 border-t-2 border-gray-300 border-dashed" />

      <div className="container flex flex-col md:flex-row justify-between">
        <div className="mb-2">
          <p className="text-sm md:text-base">Total Income</p>
          <p className="text-lg md:text-xl font-bold">{transactionTotals.income}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm md:text-base">Total Expenses</p>
          <p className="text-lg md:text-xl font-bold">{transactionTotals.expenses}</p>
        </div>
        <div className="mb-2">
          <p className="text-sm md:text-base">Total Balance</p>
          <p className="text-lg md:text-xl font-bold">{transactionTotals.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
