'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Trash2, RefreshCcw, PlusIcon } from 'lucide-react';
import { SearchBox } from '@/components/FormElements/SearchBox/SearchBox';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/Loading/TableLoading';

import Switch from '../ui-elements/Switch/Switch';
import DeleteModal from '@/components/Modals/DeleteModal';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useChangeProductStatus, useDeleteProduct, useGetProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  category: { _id: string; name: string };
  images: string[];
  price: { basePrice: number; sellingPrice: number };
  videos?: string[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductTable: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'active' | 'inactive' | 'deleted'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();

  const query: Record<string, any> = { search, sortBy, sortOrder: order, page };
  if (tab === 'all') query.isDeleted = false;
  if (tab === 'active') query.isActive = true;
  if (tab === 'inactive') query.isActive = false;
  if (tab === 'deleted') query.isDeleted = true;
  console.log(page);

  const { data, refetch, isFetching, isLoading } = useGetProducts(query);
  const { mutate: changeStatus } = useChangeProductStatus();
  const { mutate: deleteProduct } = useDeleteProduct();

  return (
    <div>
      <div className="w-full">
        <Breadcrumb pageName="Products" />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Tabs */}
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'deleted'].map((t) => (
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
          onClick={() => router.push('/add-product')}
          className="flex items-center gap-2 rounded-lg bg-[#2563EB] bg-gray-100 px-4 py-2 text-white shadow transition-colors"
          disabled={isFetching}
        >
          <PlusIcon />
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
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.data.map((product: Product, index: number) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.category?.name || '-'}</TableCell>
                <TableCell>
                  <img className="w-12" src={product?.images[0]} alt="" />
                </TableCell>
                <TableCell>{new Date(product?.createdAt).toDateString()}</TableCell>
                <TableCell>{product.price.basePrice}</TableCell>
                <TableCell>{product.price.sellingPrice}</TableCell>
                <TableCell>
                  <Switch
                    checked={product.isActive}
                    onChange={() => changeStatus({ productId: product._id, status: !product?.isActive })}
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Eye
                    onClick={() => {
                      setProduct(product);
                      // open a view modal if you have one
                    }}
                    size={18}
                    className="cursor-pointer text-blue-600"
                  />
                  <Trash2
                    onClick={() => {
                      setProduct(product);
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

      <DeleteModal
        onCancel={() => setDeleteModal(false)}
        onConfirm={() => {
          deleteProduct(product?._id);
          setDeleteModal(false);
        }}
        isOpen={deleteModal}
        text={'Product'}
      />
    </div>
  );
};

export default ProductTable;
