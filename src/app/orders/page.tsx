'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for orders
const ordersData = [
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-01.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-01.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-02.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-02.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-03.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-03.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-04.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-04.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-05.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-05.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-06.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-01.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-07.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-02.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-08.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-03.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-09.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-04.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-10.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-05.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-11.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-01.png' },
    quantity: 12,
    amount: 1000.00,
  },
  {
    id: '1000012KLs',
    customer: { name: 'Win Josh', id: 'D 12323', avatar: '/images/user/user-12.png' },
    status: 'COMPLETED',
    date: 'Sep 12, 2023',
    time: '12:34 PM',
    product: { name: 'Product1', image: '/images/product/product-02.png' },
    quantity: 12,
    amount: 1000.00,
  },
];

const tabs = [
  { id: 'all', label: 'All Orders', count: 1000 },
  { id: 'completed', label: 'Completed Orders', count: 50 },
  { id: 'pending', label: 'Pending Orders', count: 50 },
  { id: 'cancelled', label: 'Canceled Orders', count: 50 },
  { id: 'sent', label: 'Send Orders', count: 50 },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-dark dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white shadow-1 dark:bg-gray-dark">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stroke dark:border-stroke-dark">
                <th className="px-4 py-4 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Order ID ↕
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Customer ↕
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status ↕
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date And Time
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount
                </th>
                <th className="px-4 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">{order.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={order.customer.avatar}
                          alt={order.customer.name}
                          width={40}
                          height={40}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {order.customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p>{order.date}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{order.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={order.product.image}
                          alt={order.product.name}
                          width={40}
                          height={40}
                          className="h-full w-full rounded object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {order.product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">{order.quantity}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹ {order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-stroke px-4 py-4 dark:border-stroke-dark">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            1-12 of 12
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Page:</span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="rounded border border-stroke bg-white px-3 py-1 text-sm dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
            >
              <option value={1}>01</option>
              <option value={2}>02</option>
              <option value={3}>03</option>
            </select>
            <button
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <svg
                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <svg
                className="h-4 w-4 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

