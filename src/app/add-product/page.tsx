'use client';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import BasicDetails from './_components/basicDetails';
import ProductSpecification from './_components/ProductSpecification';
import Inventory from './_components/Inventory';
import Pricing from './_components/Pricing';
import Media from './_components/Media';

function Page() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Basic Details',
    'Product Specification',
    'Inventory Details',
    'Pricing & SEO',
    'Images',
  ];

  return (
    <div className="w-full">
      <Breadcrumb pageName="Create New Product" />

      {/* Stepper Tabs */}
      <div className="mt-6 w-full flex">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center py-4 cursor-pointer`}
            onClick={() => setActiveStep(index)}
          >
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                ${
                  index === activeStep
                    ? 'bg-blue-600 text-white'
                    : index < activeStep
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-500'
                }`}
            >
              {index + 1}
            </div>

            {/* Step Label */}
            <div className="mt-2 text-center text-sm font-medium">
              <span
                className={`${
                  index === activeStep
                    ? 'text-blue-600'
                    : index < activeStep
                    ? 'text-blue-500'
                    : 'text-gray-500'
                }`}
              >
                {step.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 p-6 border rounded-lg bg-white dark:bg-gray-800">
        {activeStep === 0 && <BasicDetails/>}
        {activeStep === 1 && <ProductSpecification/>}
        {activeStep === 2 && <Inventory/>}
        {activeStep === 3 && <Pricing/>}
        {activeStep === 4 && <Media/>}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-end gap-4">
        <button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() => setActiveStep(Math.min(activeStep + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page;
