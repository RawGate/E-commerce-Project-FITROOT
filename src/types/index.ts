export interface Product {
    id: string;
    name: string;
    categoryId: string;
    // properties based on backend 
    slug?: string;
    image?: string;
    description?: string;
    soldQuantity?: number;
    price: number;
    stock: number;
    createdAt?: string;
}

