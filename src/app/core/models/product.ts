// Table data
export class ProductModel {
  id: number;
  category: string;
  collections: Collections[];
  currency: string;
  description: string;
  extra_images: ExtraImages[];
  image: string;
  is_archived: boolean
  is_published: boolean;
  stock_availability: boolean;
  name: string;
  quantity: number;
  price: number;
  new_price: number;
  old_price: number;
  product_state: string;
  sku: string;
  slug: string;
  star_rating: number;
  tags: string;
  weight: string;
  isSelected: boolean;
  sales: string;
  sold: string;
}

export class Collections {
  id: string;
  image: string;
  is_active: boolean;
}

export class ExtraImages {
  id: string;
  image: string;
  is_active: boolean;
}