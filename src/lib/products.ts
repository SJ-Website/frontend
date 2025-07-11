export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // or number if you're converting it
  category: string;
  subcategory: string;
  image_url: string;
  weight: string;
  slug: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
