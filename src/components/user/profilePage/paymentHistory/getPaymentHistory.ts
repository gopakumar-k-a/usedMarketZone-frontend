// import { ObjectId } from "mongodb"; // Ensure this is imported if you're using ObjectId

export interface TransactionHistory {
  _id: string; // or ObjectId if you're using MongoDB's ObjectId type
  amount: number;
  productId: string; // or ObjectId if using MongoDB's ObjectId type
  createdAt: string; // ISO date string
}

export const getPaymentHistory = async (): Promise<TransactionHistory[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: '66b4cda42b69f6bd041d3b88',
          amount: 280000,
          productId: '66b4cc692b69f6bd041d3ad0',
          createdAt: '2024-08-08T13:52:36.247Z',
        },
        // Add more transaction history items if needed
      ]);
    }, 1000);
  });
};
