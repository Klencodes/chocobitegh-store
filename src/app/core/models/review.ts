import { ProductModel } from "./product";
import { UserModel } from "./user";

export class ReviewModel {
    id: string;
    product: ProductModel;
    customer: UserModel;
    review: string;
    star_rating: number;
    date_created: string;
    title: string;
    feedback: string;
    status: string;
    replies: ReplyModel[]
    is_published: boolean;
    isSelected: boolean;
}

export class ReplyModel {
    customer: UserModel;
    date_created: string;
    dislike: number
    feedback: string
    id: number;
    is_published: boolean;
    like: number;
}