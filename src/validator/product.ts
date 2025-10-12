import * as Yup from 'yup';

export const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name cannot exceed 100 characters'),

  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  richDescription: Yup.string().optional(),

  category: Yup.string()
    .required('Category is required'),

  basePrice: Yup.number()
    .typeError('Base price must be a number')
    .required('Base price is required')
    .min(0, 'Base price cannot be negative'),

  sellingPrice: Yup.number()
    .typeError('Selling price must be a number')
    .required('Selling price is required')
    .min(0, 'Selling price cannot be negative')
    .test(
      'is-greater-than-base',
      'Selling price must be greater than or equal to base price',
      function (value) {
        const { basePrice } = this.parent;
        return Number(value) >= Number(basePrice);
      }
    ),

  stock: Yup.number()
    .typeError('Stock must be a number')
    .required('Stock quantity is required')
    .min(0, 'Stock cannot be negative'),

  isActive: Yup.boolean()
    .required('Status is required'),

  images: Yup.array()
    .of(Yup.string().required('Image URL is required')) // each item should be a string
    .min(1, 'At least one image is required') // minimum one image
});
