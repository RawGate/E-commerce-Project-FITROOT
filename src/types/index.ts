export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  products: Product[]
};

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
    products: Product[]
    product: Product | null
    error: null | string
    isLoading: boolean
}

export type User ={
  role?: string
  name: string
  address: string
  email: string
  password: string
  phone: string
  createdAt?: string
  
}

export interface UserState {
  error: string | null;
  isLoading: boolean;
  userData: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

export type LoginFormData = {
  email: string
  password: string
}