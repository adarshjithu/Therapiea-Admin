'use client';
import React, { useState } from 'react';
import BasicDetails from './_components/basicDetails';
import Inventory from './_components/Inventory';
import Pricing from './_components/Pricing';
import Media from './_components/Media';
import { addProductSchema } from '@/validator/product';
import { ValidationError } from 'yup';
import { LoadingSpinner } from '@/components/Loading/TableLoading';
import { createProduct } from '@/api/services/productServices';
import toast from 'react-hot-toast';

export interface IAddProductForm {
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  richDescription: string;
  mrp: string;
  sellingPrice: string;
  stock: number;
  images: string[];
}

export interface CommonFormProps {
  setFormData: React.Dispatch<React.SetStateAction<IAddProductForm>>;
  formData: IAddProductForm;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  errors?: Record<string, any>;
}

const initialForm: IAddProductForm = {
  name: '',
  description: '',
  category: '',
  isActive: true,
  richDescription: '',
  mrp: '',
  sellingPrice: '',
  stock: 0,
  images: [],
};

function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IAddProductForm>(initialForm);

  const steps = ['Basic Details', 'Pricing', 'Inventory Details', 'Media'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async () => {
    const form = new FormData();
    form.append('name', formData.name || '');
    form.append('description', formData.description || '');
    form.append('richDescription', formData.richDescription || '');
    form.append('category', formData.category || '');
    form.append(
      'price',
      JSON.stringify({
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
      })
    );
    form.append('isActive', formData.isActive ? 'true' : 'false');
    form.append('quantity', String(formData.stock));
    images.forEach((file: File) => form.append('images', file));
    if (video) form.append('videos', video);

    try {
      setLoading(true);
      
      await addProductSchema.validate(formData, { abortEarly: false });

     
      const res = await createProduct(form);

      if (res?.success) {
        toast.success(res.message || 'Product created successfully!');

        
        setFormData(initialForm);
        setImages([]);
        setVideo(null);
        setErrors({});
        setActiveStep(0); // go back to first step
      } else {
        toast.error(res?.message || 'Something went wrong');
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) fieldErrors[error.path] = error.message;
        });
        setErrors(fieldErrors);
        toast.error('Please fix the validation errors');
      } else {
        toast.error('Server or network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between rounded-lg border-b bg-[#F3F4F6] px-6 py-4 md:flex-row md:items-center">
        <h1 className="mb-3 whitespace-nowrap text-xl font-semibold text-gray-800 md:mb-0">
          Create New Product
        </h1>

        {/* Step Indicator */}
        <div className="flex w-full flex-wrap justify-between gap-4 md:w-[75%] lg:w-[80%]">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200 ${
                  index === activeStep
                    ? 'bg-blue-600 text-white'
                    : index < activeStep
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm font-medium ${
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
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
        {activeStep === 0 && (
          <BasicDetails
            errors={errors}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}
        {activeStep === 1 && (
          <Pricing errors={errors} setFormData={setFormData} formData={formData} />
        )}
        {activeStep === 2 && (
          <Inventory errors={errors} formData={formData} setFormData={setFormData} />
        )}
        {activeStep === 3 && (
          <Media
            formData={formData}
            errors={errors}
            images={images}
            setFormData={setFormData}
            setImages={setImages}
            video={video}
            setVideo={setVideo}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between px-6 pb-6">
        <button
          disabled={activeStep === 0 || loading}
          onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
          className="rounded-lg bg-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-300 disabled:opacity-50"
        >
          Back
        </button>

        {activeStep === steps.length - 1 ? (
          <button
            disabled={loading}
            onClick={handleCreateProduct}
            className="rounded-lg bg-green-600 h-12 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? <LoadingSpinner size={18} /> : 'Finish'}
          </button>
        ) : (
          <button
            onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
