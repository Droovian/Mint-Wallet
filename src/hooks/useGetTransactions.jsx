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

        try{
            const queryTransactions = query(collectionReference, where("userID", "==", userID));

             onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                var totalIncome = 0;
                var totalExpenses = 0;
                // basically tracks changes, it contains data for the users
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });

                    if(data.type === "expense"){ 
                        totalExpenses += parseFloat(data.Amount);
                    }
                    else{ 
                        totalIncome += parseFloat(data.Amount);
                    }
                });
                console.log(totalExpenses, totalIncome);
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
        }
        catch(err){
            console.error("Error fetching transactions", err);
        }

    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return { transactions, transactionTotals };
};