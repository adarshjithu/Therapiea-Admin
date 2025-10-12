'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, RefreshCcw, Plus, Eye, PenIcon } from 'lucide-react';
import { SearchBox } from '@/components/FormElements/SearchBox/SearchBox';
import { Pagination } from '@/components/ui/pagination';
import Switch from '../ui-elements/Switch/Switch';
import DeleteModal from '@/components/Modals/DeleteModal';
import AddCategoryModal from '@/components/Modals/AddCategoryModal';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useGetAllCategories } from '@/hooks/useCategories';
import { ICategory } from '@/interface/ICategory';
import { LoadingSpinner } from '@/components/Loading/TableLoading';

interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
  isDeleted: boolean;
  isActive: boolean;
  isProductsAssociated: boolean;
  createdAt: string;
  updatedAt: string;
}

const CategoryTable: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'active' | 'inactive' | 'deleted' | 'product' | 'accessories'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const query: Record<string, any> = { search, sortBy, sortOrder: order, page };
  if (tab === 'all') {
    query.isDeleted = false;
  }
  if (tab === 'active') query.isActive = true;
  if (tab === 'inactive') query.isActive = false;
  if (tab === 'deleted') query.isDeleted = true;
  if (tab == 'product') query.isProductsAssociated = true;
  if (tab == 'accessories') query.isProductAssociated = false;

  const { data, isLoading } = useGetAllCategories(query);

  return (
    <div>
      <div className="w-full">
        <Breadcrumb pageName="Categories" />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Tabs */}
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'deleted', 'product', 'accessories'].map((t) => (
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

        {/* Add Category Button */}
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Active</TableHead>

              <TableHead>Created At</TableHead>
              <TableHead>Products Associated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.data?.map((cat: ICategory) => (
              <TableRow key={cat._id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell>
                  {cat.image ? <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded" /> : '—'}
                </TableCell>
                <TableCell>
                  <Switch checked={cat.isActive} onChange={() => {}} />
                </TableCell>
                <TableCell>{new Date(cat?.createdAt).toDateString()}</TableCell>
                <TableCell>{cat.isProductsAssociated ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-2">
                  <Eye
                    onClick={() => {
                      setCategory(cat);
                      setDeleteModal(true);
                    }}
                    size={18}
                    className="cursor-pointer text-blue-600"
                  />
                  <PenIcon
                    onClick={() => {
                      setCategory(cat);
                      setDeleteModal(true);
                    }}
                    size={18}
                    className="cursor-pointer text-blue-600"
                  />
                  <Trash2
                    onClick={() => {
                      setCategory(cat);
                      setDeleteModal(true);
                    }}
                    size={18}
                    className="cursor-pointer text-red-600"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <Pagination page={page} onPageChange={(pageCount) => setPage(pageCount)} totalPages={Math.ceil(0 / 10)} />

      {/* Delete Modal */}
      <DeleteModal
        onCancel={() => setDeleteModal(false)}
        onConfirm={() => {
          // perform delete here
          setDeleteModal(false);
        }}
        isOpen={deleteModal}
        text={'Category'}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={(newCategory) => {
          console.log('New category:', newCategory);
          // TODO: Implement API call to create category
          setAddModal(false);
        }}
      />
    </div>
  );
};

export default CategoryTable;
