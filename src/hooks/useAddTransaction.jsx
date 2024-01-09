import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase'
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const useAddTransaction = () => {
    const transactionCollRef = collection(db, "transactions");
    const { userID } = useGetUserInfo(); 
    const enterTransaction = async ({ description, Amount, type }) => {
        await addDoc(transactionCollRef, {
            userID,
            description,
            Amount,
            type,
            createdAt: serverTimestamp()
        });
    };

    return { enterTransaction };
}
 
