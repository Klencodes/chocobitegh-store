import { UserModel } from "./user";

export class ProductModel {
  id: number;
  category: CategoryModel;
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
  unit: string;
  slug: string;
  weight: string;
  tags: string;
  rating: number;
  reviews: ReviewModel[];
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

export class BannerModel {
  id: number;
  image: string;
  name: string;
  description: string;
}

export class ReviewModel {
  id: number;
  title: string;
  summary: string;
  likes: number;
  dislikes: number;
  rating: number;
  date_created: string;
  date_updated: string;
  reviewer_ip: string;
  reviewer: UserModel;
  replies: ReplyModel[]

}

export class ReplyModel {
  id: number;
  title: string;
  summary: string;
  reviewer_ip: string;
  date_created: string;
  date_updated: string;
  reviewer: string;
}