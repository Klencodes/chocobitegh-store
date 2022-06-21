export class ProductModel {
  id: number;
  category: CategoryModel[];
  currency: string;
  description: string;
  extra_images: ExtraImages[];
  image: string;
  is_archived: boolean
  is_published: boolean;
  stock_availability: boolean;
  name: string;
  new_price: string;
  price: string;
  old_price: string;
  product_state: string;
  sku: string;
  quantity: number;
  weight: string;
  unit: string;
  slug: string;
  tags: string;
  isSelected: boolean;
  sales: string;
  sales_count: string;
}

export class CategoryModel {
  id: number;
  name: string;
  image: string;
  slug: string;
  description: string;
  view_count: number;
  is_active: boolean;
}

export class ExtraImages {
  id: string;
  image: string;
  is_active: boolean;
}