export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  brand: string;
  brandDetails?: {
    id: string;
    name: string;
    description: string;
    foundedYear: number;
    country: string;
  };
  category?: string;
  description?: string;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    userName: string;
    date: string;
  }>;
}