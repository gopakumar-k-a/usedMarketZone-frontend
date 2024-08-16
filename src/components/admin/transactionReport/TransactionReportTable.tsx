import { Transaction } from '@/types/admin/transaction'

function TransactionReportTable({transactions}:{transactions:Transaction[]}) {
  return (
<>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product id
              </th>
              <th scope="col" className="px-6 py-3">
                shipment status
              </th>
              <th scope="col" className="px-6 py-3">
                payment status
              </th>
              <th scope="col" className="px-6 py-3">
                Bid Won Price
              </th>
              <th scope="col" className="px-6 py-3">
                Commission
              </th>
              <th scope="col" className="px-6 py-3">
                amount to
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction:Transaction) => (
              <tr
                key={transaction.productId}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{transaction.productId}</td>
                {transaction.transactionId ? (
                  <>
                    <td className="px-6 py-4">{transaction.shipmentStatus}</td>
                    <td className="px-6 py-4">
                      {transaction.transactionStatus}
                    </td>
                  </>
                ) : (
                  <td>transaction Not Done</td>
                )}

                <td className="px-6 py-4">&#8377; {transaction.wonPrice}</td>
                <td className="px-6 py-4">
                  &#8377; {(transaction.wonPrice * 1) / 100}
                </td>
                <td className="px-6 py-4">
                  &#8377;{" "}
                  {transaction.wonPrice - (transaction.wonPrice * 1) / 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</>
  )
}

export default TransactionReportTable
