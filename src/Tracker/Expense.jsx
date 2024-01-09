import { useState } from "react";
import { useAddTransaction } from '../hooks/useAddTransaction'
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { useNavigate } from "react-router-dom";
import Transactions from "./Transactions";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Expense = () => {
    const navigate = useNavigate();
    const { enterTransaction } = useAddTransaction();
    const { transactions } = useGetTransactions();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const { name, profilePic } = useGetUserInfo();
    const [type, setType] = useState("expense");

    const handleSubmit = (e) => {
        e.preventDefault();
        enterTransaction({
            description: description,
            Amount: amount,
            type: type,
        });

        setDescription("");
        setAmount("");
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-black h-screen">
            <div className="w-full md:w-1/3 bg-white p-4 shadow-md">
                <Transactions transactions={transactions} />
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-3 bg-black text-white">
                <div className="p-3">
                    {profilePic && (
                        <div className="flex justify-center p-2">
                            <img
                                src={profilePic}
                                alt="profile-photo"
                                className="rounded-full size-32"
                            />
                        </div>
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold text-center p-2">
                        {name}'s Expense Tracker
                    </h1>
                </div>
                <form
                    className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="w-full p-3 mb-4 text-gray-800 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        placeholder="Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        required
                    />
                    <input
                        className="w-full p-3 mb-4 text-gray-800 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        required
                    />
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="text-gray-800">
                            <input
                                type="radio"
                                id="expense"
                                name="transactionType"
                                value="expense"
                                checked={type === "expense"}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                                className="mr-2 text-blue-500"
                            />
                            Expense
                        </label>
                        <label className="text-gray-800">
                            <input
                                type="radio"
                                id="income"
                                name="transactionType"
                                value="income"
                                checked={type === "income"}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                                className="mr-2 text-blue-500"
                            />
                            Income
                        </label>
                    </div>
                    <button
                        className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:border-blue-300"
                        type="submit"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
            <div className="w-full md:w-1/3 p-3 flex h-20 md:h-16 justify-end mr-20">
                <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md flex justify-center items-center hover:bg-red-400"
                    onClick={signUserOut}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Expense;
