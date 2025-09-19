'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Eye, Trash2, RefreshCcw } from 'lucide-react';
import { SearchBox } from '@/components/FormElements/SearchBox/SearchBox';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/Loading/TableLoading';
import { useBlockUser, useChangeCustomerStatus, useDeleteUser, useGetAllCustomers } from '@/hooks/useCustomers';
import Switch from '../ui-elements/Switch/Switch';
import ViewUserModal from './_components/viewUserModal';
import DeleteModal from '@/components/Modals/DeleteModal';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: 'user' | 'admin';
  image?: string;
  countryCode: string;
  createdAt: string;
  isActive: boolean;
  isBlocked: boolean;
}

const UserTable: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'active' | 'inactive' | 'blocked' | 'deleted'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<any>();
  const [deleteModal, setDeleteModal] = useState(false);

  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);

  const query: Record<string, any> = { search, sortBy, sortOrder: order, page };
  if (tab === 'all') {
    query.isDeleted = false;
  }
  if (tab === 'active') query.isActive = true;
  if (tab === 'inactive') query.isActive = false;
  if (tab === 'blocked') query.isBlocked = true;
  if (tab === 'deleted') query.isDeleted = true;

  const { data, refetch, isFetching, isLoading } = useGetAllCustomers(query);
  const { mutate: changeStatus } = useChangeCustomerStatus();
  const { mutate: blockCustomer } = useBlockUser();
  const { mutate: deleteUser } = useDeleteUser();

  return (
    <div>
      <div className='w-full'>
       
       <Breadcrumb pageName='Customers'/>
      </div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Tabs */}
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'blocked', 'deleted'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                tab === t
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <SearchBox value={search} onChange={(value) => setSearch(value)} />

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* Reload */}
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 shadow transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          disabled={isFetching}
        >
          <RefreshCcw size={18} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Table */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70">
            <LoadingSpinner size={60} />
          </div>
        )}

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Country Code</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Blocked</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.customers?.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.countryCode}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onChange={() => {
                      changeStatus(user?._id);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isBlocked}
                    onChange={() => {
                      blockCustomer(user?._id);
                    }}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Eye
                    onClick={() => {
                      setUser(user);
                      setIsViewUserModalOpen(true);
                    }}
                    size={18}
                    className="cursor-pointer text-blue-600"
                  />
                  <Trash2
                    onClick={() => {
                      setUser(user);
                      setDeleteModal(true);
                    }}
                    size={18}
                    className="text-red-600"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        onPageChange={(pageCount) => setPage(pageCount)}
        totalPages={Math.ceil((data?.data?.total || 0) / 10)}
      />
      {isViewUserModalOpen && (
        <ViewUserModal user={user} isOpen={isViewUserModalOpen} onClose={() => setIsViewUserModalOpen(false)} />
      )}
      <DeleteModal
        onCancel={() => setDeleteModal(false)}
        onConfirm={() => {
          deleteUser(user?._id);
          setDeleteModal(false);
        }}
        isOpen={deleteModal}
        text={'User'}
      />
    </div>
  );
};

export default UserTable;
