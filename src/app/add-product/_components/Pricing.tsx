'use client';
import React, { useState } from 'react';
import { IAddProductForm } from '../page';

export interface IPricing {
  setFormData: React.Dispatch<React.SetStateAction<IAddProductForm>>;
  formData: IAddProductForm;
  errors:Record<string,any>
}

function Pricing({ setFormData, formData,errors }: IPricing) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-800">Pricing</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Base Price */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Base Price</label>
          <input
            type="number"
            name="basePrice"
            value={formData?.basePrice}
            onChange={(e: any) => {
              setFormData({ ...formData, basePrice: e.target.value });
            }}
            placeholder="Enter base price"
            className="w-full rounded-md border border-gray-300 bg-[#F3F4F6] px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            {errors?.basePrice && (
              <span className="mt-2 block text-sm font-medium text-red-500">{errors?.basePrice}</span>
            )}
        </div>

        {/* Selling Price */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Selling Price</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData?.sellingPrice}
            onChange={(e: any) => {
              setFormData({ ...formData, sellingPrice: e.target.value });
            }}
            placeholder="Enter selling price"
            className="w-full rounded-md border border-gray-300 bg-[#F3F4F6] px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {errors?.sellingPrice && (
              <span className="mt-2 block text-sm font-medium text-red-500">{errors.sellingPrice}</span>
            )}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
