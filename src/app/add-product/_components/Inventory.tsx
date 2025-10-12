'use client';
import React from 'react';
import { CommonFormProps } from '../page';

function Inventory({ formData, setFormData,errors }: CommonFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-800">Inventory</h1>

      <div className="w-full lg:w-1/2">
        <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          name="stock"
          value={(formData as any).stock || ''} // Ensure TS knows stock exists
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, stock: Number(e.target.value) }))
          }
          placeholder="Enter available stock"
          className="w-full rounded-md border border-gray-300 bg-[#F3F4F6] px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          {errors?.stock && (
              <span className="mt-2 block text-sm font-medium text-red-500">{errors.stock}</span>
            )}
      </div>
    </div>
  );
}

export default Inventory;
