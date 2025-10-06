export interface ICategory  {
    name: string;
    description: string;
    image?: string;
    isDeleted: boolean;
    isActive: boolean;
    isProductsAssociated: boolean;
    createdAt: Date;
    updatedAt: Date;
    _id:any
}