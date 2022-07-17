export class UserModel {
    id?: string;
    first_name?: string;
    last_name?: string;
    image?: string;
    email?: string;
    phone_number?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string
    auth_token?: string;
    birth_date?: string;
    gender?: string;
    addresses?: AddressModel[];
    deactivate_manager?: boolean;
    total_orders?: string;
    total_amount_spent?: string;
    user_type?: string;
    reward_value ?: string;
    isSelected?: boolean;
    news_letter?: boolean;
    is_new_customer?: boolean;
    has_abandoned_checkout?: boolean;
    is_returning_customer?: boolean;
    date_created?: string;
    date_updated?: string;
    is_superuser?: boolean;
    is_staff?: boolean;
    is_active?: boolean;
}

export class AddressModel {
    address_1: string;
    address_2: string;
    city: string;
    country: string;
    id: string;
    postal_code: string;
    state: string;
}