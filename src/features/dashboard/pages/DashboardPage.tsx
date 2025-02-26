import { useState } from 'react';
import IncomingWidget from '../components/IncomingWidget.tsx';
import OutgoingWidget from '../components/OutgoingWidget.tsx';
import BalanceWidget from '../components/BalanceWidget.tsx';

const fakeTransactions = [
  {
    date: '2024-03-15',
    description: 'Monthly Salary',
    amount: '+$3,500.00',
    status: 'Completed',
  },
  {
    date: '2024-03-14',
    description: 'Netflix Subscription',
    amount: '-$15.99',
    status: 'Completed',
  },
  {
    date: '2024-03-13',
    description: 'Grocery Shopping',
    amount: '-$125.50',
    status: 'Completed',
  },
  {
    date: '2024-03-12',
    description: 'Client Payment',
    amount: '+$850.00',
    status: 'Pending',
  },
  {
    date: '2024-03-11',
    description: 'Utility Bill',
    amount: '-$75.20',
    status: 'Failed',
  },
];
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div id='dashboard-page' className='flex flex-col gap-5'>
      <div className='pt-14 font-bold antialiased'>
        <h2 className='text-xl font-extrabold'>Dashboard</h2>
        <p className='text-xs font-light text-gray-500'>Welcome back, John Doe</p>
      </div>

      <ul className='flex flex-row gap-5'>
        <li>
          <button
            className={`cursor-pointer py-2 text-sm font-semibold text-black ${activeTab === 'Overview' ? 'border-b-2 border-yellow-500' : ''}`}
            onClick={() => handleTabClick('Overview')}
          >
            Overview
          </button>
        </li>
        <li>
          <button
            className={`cursor-pointer py-2 text-sm font-semibold text-black ${activeTab === 'Transactions' ? 'border-b-2 border-yellow-500' : ''}`}
            onClick={() => handleTabClick('Transactions')}
          >
            Transactions
          </button>
        </li>
      </ul>

      {activeTab === 'Overview' && (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          <IncomingWidget />
          <OutgoingWidget />
          <BalanceWidget />
        </div>
      )}
      {activeTab === 'Transactions' && (
        <div className='grid grid-cols-1 gap-5'>
          <div className='flex flex-col gap-5 rounded-xl bg-white p-5'>
            <h3 className='border-b border-gray-300 pb-1 text-sm font-semibold text-gray-800'>
              Recent Transactions
            </h3>
            <div className='relative overflow-x-auto sm:rounded-lg'>
              <table className='w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                <thead className='bg-gray-200 text-xs text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Date
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Description
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Amount
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fakeTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                    >
                      <td className='px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white'>
                        {transaction.date}
                      </td>
                      <td className='px-6 py-4'>{transaction.description}</td>
                      <td
                        className={`px-6 py-4 ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {transaction.amount}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            transaction.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
