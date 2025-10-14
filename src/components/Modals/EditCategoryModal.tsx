'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Loader2, AlertCircle } from 'lucide-react';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { _id: string; formData: FormData }) => void;
  category: {
    _id: string;
    name: string;
    description: string;
    image?: string;
    isActive: boolean;
  } | null;
  isLoading?: boolean;
  error?: string | null;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  isLoading = false,
  error = null,
}: EditCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setDescription(category.description || '');
      setExistingImage(category.image || '');
      setIsActive(category.isActive ?? true);
      setNewImage(null);
      setImagePreview('');
    }
  }, [category]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('isActive', String(isActive));
    
    // Only append image if a new one was uploaded
    if (newImage) {
      formData.append('image', newImage);
    }
    
    onSubmit({ _id: category._id, formData });
    // Don't close modal here - let parent handle it on success
  };

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
            Edit Category
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 sm:mx-6 mt-4 flex items-center gap-3 rounded-lg bg-red-50 p-3 sm:p-4 dark:bg-red-900/20">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-gray-900 outline-none transition focus:border-primary dark:border-stroke-dark dark:text-white dark:focus:border-primary"
                placeholder="Enter category name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-gray-900 outline-none transition focus:border-primary dark:border-stroke-dark dark:text-white dark:focus:border-primary"
                placeholder="Enter category description"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Category Image
              </label>
              <div className="flex items-start gap-4">
                {/* Show current or new image preview */}
                {(imagePreview || existingImage) && (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600">
                    <img
                      src={imagePreview || existingImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    {(imagePreview || existingImage) && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewImage(null);
                          setImagePreview("");
                          setExistingImage("");
                        }}
                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )}

                {/* Upload Button */}
                <label
                  htmlFor="edit-image-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <Upload size={20} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {newImage ? "Change Image" : "Upload New Image"}
                  </span>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="editIsActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-2 focus:ring-primary dark:border-stroke-dark"
              />
              <label htmlFor="editIsActive" className="text-sm font-medium text-gray-900 dark:text-white">
                Active Category
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border border-stroke px-4 sm:px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stroke-dark dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 sm:px-6 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                'Update Category'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

