'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ViewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: {
    _id: string;
    name: string;
    description: string;
    image?: string;
    isActive: boolean;
    isProductsAssociated: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
  } | null;
}

export default function ViewCategoryModal({
  isOpen,
  onClose,
  category,
}: ViewCategoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen || !category) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/50 p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-4 sm:px-6 py-3 sm:py-4 dark:border-stroke-dark">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Category Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Image */}
            {category.image && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Image
                </label>
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-40 w-full rounded-lg object-cover"
                />
              </div>
            )}

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Category Name
              </label>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {category.name}
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Description
              </label>
              <p className="text-base text-gray-900 dark:text-white">
                {category.description || 'No description provided'}
              </p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Active Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </label>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    category.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Products Associated */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Products Associated
                </label>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    category.isProductsAssociated
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {category.isProductsAssociated ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Created At */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created At
                </label>
                <p className="text-base text-gray-900 dark:text-white">
                  {new Date(category.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </label>
                <p className="text-base text-gray-900 dark:text-white">
                  {new Date(category.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-4 sm:mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-lg bg-primary px-4 sm:px-6 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

