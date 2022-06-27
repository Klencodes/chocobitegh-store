import { ProductModel } from "./product"

export interface Wishlist {
    date_created: string;
    date_updated: string;
    id: number
    product: ProductModel;
}