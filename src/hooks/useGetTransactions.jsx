import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { useState, useEffect } from "react";

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
    });

    const collectionReference = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const fetchTransactions = async () => {
        try {
            const queryTransactions = query(collectionReference, where("userID", "==", userID));
    
            onSnapshot(queryTransactions, (snapshot) => {
                let docs = [...transactions]; 
                let totalIncome = 0;
                let totalExpenses = 0;
    
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
    
                    // im checking if theres a transaction already & adding to that only instead of creating new
                    const existingTransactionIndex = docs.findIndex(
                        (t) => t.description === data.description && t.type === data.type
                    );
    
                    if (existingTransactionIndex !== -1) {
                        docs[existingTransactionIndex].Amount += parseFloat(data.Amount);
                    } else {
                        docs.push({ ...data, id, Amount: parseFloat(data.Amount) });
                    }
    
                    if (data.type === "expense") {
                        totalExpenses += parseFloat(data.Amount);
                    } else {
                        totalIncome += parseFloat(data.Amount);
                    }
                });
    
                setTransactions(docs);
    
                totalIncome = parseFloat(totalIncome);
                totalExpenses = parseFloat(totalExpenses);
    
                let balance = totalIncome - totalExpenses;
    
                setTransactionTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,
                });
            });
        } catch (err) {
            console.error("Error fetching transactions", err);
        }
    };
    

    useEffect(() => {
        fetchTransactions();
    }, []);

    return { transactions, transactionTotals };
};