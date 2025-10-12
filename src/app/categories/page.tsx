'use client';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, RefreshCcw, Plus, Eye, PenIcon } from 'lucide-react';
import { SearchBox } from '@/components/FormElements/SearchBox/SearchBox';
import { Pagination } from '@/components/ui/pagination';
import Switch from '../ui-elements/Switch/Switch';
import DeleteModal from '@/components/Modals/DeleteModal';
import AddCategoryModal from '@/components/Modals/AddCategoryModal';
import EditCategoryModal from '@/components/Modals/EditCategoryModal';
import ViewCategoryModal from '@/components/Modals/ViewCategoryModal';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { 
  useGetAllCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '@/hooks/useCategories';
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
  const [tab, setTab] = useState<'all' | 'active' | 'inactive'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  const query: Record<string, any> = { search, sortBy, sortOrder: order, page };
  if (tab === 'all') {
    query.isDeleted = false;
  }
  if (tab === 'active') {
    query.isActive = true;
    query.isDeleted = false;
  }
  if (tab === 'inactive') {
    query.isActive = false;
    query.isDeleted = false;
  }

  const { data, isLoading } = useGetAllCategories(query);
  
  // Fetch all categories to get accurate counts
  const { data: allCategoriesData } = useGetAllCategories({ 
    isDeleted: false, 
    page: 1, 
    limit: 1000 // Get all categories for counting
  });

  // Calculate counts from actual data (correct path: data?.data?.data)
  const categories = allCategoriesData?.data?.data || [];
  const totalCount = categories.length || 0;
  const activeCount = categories.filter((cat: ICategory) => cat.isActive === true).length || 0;
  const inactiveCount = categories.filter((cat: ICategory) => cat.isActive === false).length || 0;

  // Debug log
  console.log('Categories Data:', { 
    total: totalCount, 
    active: activeCount, 
    inactive: inactiveCount,
    categoriesArray: categories 
  });

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleCreate = (newCategory: any) => {
    setAddError(null); // Clear previous errors
    createCategoryMutation.mutate(newCategory, {
      onSuccess: () => {
        setAddModal(false);
        setAddError(null);
      },
      onError: (error: any) => {
        setAddError(error.message || 'Failed to create category');
      }
    });
  };

  const handleUpdate = (data: { _id: string; formData: FormData }) => {
    setEditError(null); // Clear previous errors
    updateCategoryMutation.mutate(
      { categoryId: data._id, formData: data.formData },
      {
        onSuccess: () => {
          setEditModal(false);
          setCategory(null);
          setEditError(null);
        },
        onError: (error: any) => {
          setEditError(error.message || 'Failed to update category');
        }
      }
    );
  };

  const handleDelete = () => {
    if (category?._id) {
      deleteCategoryMutation.mutate(category._id, {
        onSuccess: () => {
          setDeleteModal(false);
          setCategory(null);
        }
      });
    }
  };

  const handleToggleActive = (cat: ICategory) => {
    // Send as JSON object (not FormData) for simple updates
    const updatedData = {
      name: cat.name,
      description: cat.description,
      isActive: !cat.isActive
    };
    
    updateCategoryMutation.mutate({
      categoryId: cat._id,
      formData: updatedData
    });
  };

  return (
    <div>
      <div className="w-full">
        <Breadcrumb pageName="Categories" />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setTab('all');
              setPage(1);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>All Categories</span>
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
              tab === 'all'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-800 dark:bg-gray-600 dark:text-gray-200'
            }`}>
              {totalCount}
            </span>
          </button>
          
          <button
            onClick={() => {
              setTab('active');
              setPage(1);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'active'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>Active Categories</span>
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
              tab === 'active'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-800 dark:bg-gray-600 dark:text-gray-200'
            }`}>
              {activeCount}
            </span>
          </button>
          
          <button
            onClick={() => {
              setTab('inactive');
              setPage(1);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'inactive'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>Inactive Categories</span>
            <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
              tab === 'inactive'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-gray-800 dark:bg-gray-600 dark:text-gray-200'
            }`}>
              {inactiveCount}
            </span>
          </button>
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
                  <Switch 
                    checked={cat.isActive} 
                    onChange={() => handleToggleActive(cat)} 
                  />
                </TableCell>
                <TableCell>{new Date(cat?.createdAt).toDateString()}</TableCell>
                <TableCell>{cat.isProductsAssociated ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-2">
                  <button
                    onClick={() => {
                      setCategory(cat);
                      setViewModal(true);
                    }}
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setCategory(cat);
                      setEditModal(true);
                    }}
                    className="cursor-pointer text-green-600 hover:text-green-700"
                    title="Edit"
                  >
                    <PenIcon size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setCategory(cat);
                      setDeleteModal(true);
                    }}
                    className="cursor-pointer text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
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
        onCancel={() => {
          setDeleteModal(false);
          setCategory(null);
        }}
        onConfirm={handleDelete}
        isOpen={deleteModal}
        text={`Category "${category?.name}"`}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={addModal}
        onClose={() => {
          setAddModal(false);
          setAddError(null);
        }}
        onSubmit={handleCreate}
        isLoading={createCategoryMutation.isPending}
        error={addError}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
          setCategory(null);
          setEditError(null);
        }}
        onSubmit={handleUpdate}
        category={category}
        isLoading={updateCategoryMutation.isPending}
        error={editError}
      />

      {/* View Category Modal */}
      <ViewCategoryModal
        isOpen={viewModal}
        onClose={() => {
          setViewModal(false);
          setCategory(null);
        }}
        category={category}
      />
    </div>
  );
};

export default CategoryTable;
