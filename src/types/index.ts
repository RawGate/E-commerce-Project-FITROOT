export type Category = {
    categoryId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    products: Product[];
}

export type Product = {
    productId: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    color: string;
    soldQuantity: number;
    price: number;
    stock: number;
    categoryId: string;
}

export type ProductState={
    products: Product[],
    product: Product | null
    error: null | string
    isLoading: boolean
}