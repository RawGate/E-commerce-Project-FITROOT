export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  products: Product[]
};

export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
}

export type Product = {
  productId: string
  name: string
  slug: string
  image: string
  description: string
  color?: string
  soldQuantity: number
  price: number
  stock: number
  categories: Category[]
  categoryId: string
}

export type ProductState={
    products: Product[]
    product: Product | null
    error: null | string
    isLoading: boolean
}

export type CartState = {
  cartItems: Product[]
}

export type User ={
  userId?: string
  role?: string
  name: string
  address: string
  email: string
  password: string
  phone: string
  isBlocked?: boolean
  
}

export interface UserState {
  users: User[]
  totalPages: number
  error: string | null
  isLoading: boolean
  userData: User | null
  token: string | null
  isLoggedIn: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}

export type UpdateProfileFormData = {
  name: string
  address: string
}

export type CreateCategoryFormData = {
  name: string
  description: string
}

export type CreateProductFormData = {
  name: string
  image: FileList
  description: string
  price: number
  stock: number
  categoryId: string
}

export type CreateProductForBackend = {
  name: string
  image: string 
  description: string
  price: number
  stock: number
  categoryId: string
}

