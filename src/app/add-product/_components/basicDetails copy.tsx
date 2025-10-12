'use client';
import React, { useRef, useState } from 'react';
import { CommonFormProps } from '../page';
import { useGetAllCategories } from '@/hooks/useCategories';
import { ICategory } from '@/interface/ICategory';
import dynamic from 'next/dynamic';

// Dynamically import RichTextEditor for client-side rendering
const RichTextEditor = dynamic(() => import('../_components/RichTextEditor'), { ssr: false });

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
};

function BasicDetails({ formData, setFormData, handleChange, errors }: CommonFormProps) {
  const { data } = useGetAllCategories({ isActive: true });

  const editorRef = useRef<RichTextEditorHandle>(null);
  const [editorContent, setEditorContent] = useState('');

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setEditorContent(content);
      setFormData((prev) => ({ ...prev, richDescription: content }));
    }
  };

  return (
    <div className="flex min-h-[700px] flex-col gap-8">
      {/* Top Section - Name, Description, Category, Active */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`w-full rounded-md border bg-[#F3F4F6] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors?.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors?.name && <span className="mt-2 block text-sm font-medium text-red-500">{errors.name}</span>}
          </div>

          {/* Short Description */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter short description"
              className={`w-full resize-none rounded-md border bg-[#F3F4F6] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors?.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors?.description && (
              <span className="mt-2 block text-sm font-medium text-red-500">{errors.description}</span>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-md border bg-[#F3F4F6] px-4 py-3 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors?.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select category</option>
              {data?.data?.data?.map((obj: ICategory) => (
                <option key={obj?._id} value={obj?._id}>
                  {obj?.name}
                </option>
              ))}
            </select>
            {errors?.category && <span className="mt-2 block text-sm font-medium text-red-500">{errors.category}</span>}
          </div>

          {/* Active Switch */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Active Status</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                  className="peer sr-only"
                />
                <div className="peer h-7 w-14 rounded-full bg-gray-300 after:absolute after:left-[4px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500"></div>
              </label>
            </div>
            {errors?.isActive && <span className="mt-2 block text-sm font-medium text-red-500">{errors.isActive}</span>}
          </div>
        </div>
      </div>

      {/* Rich Description */}
      <div className="w-full">
        <label className="mb-3 block text-lg font-semibold text-gray-800">Rich Description</label>

        <RichTextEditor ref={editorRef} />

        {errors?.richDescription && (
          <span className="mt-2 block text-sm font-medium text-red-500">{errors.richDescription}</span>
        )}

        <button
          onClick={handleGetContent}
          className="mt-4 rounded-lg bg-blue-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-600"
        >
          Save Rich Description Content
        </button>

        {editorContent && (
          <div className="mt-6 rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
            <h3 className="mb-3 text-lg font-bold text-gray-800">Content Preview:</h3>
            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: editorContent }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicDetails;
