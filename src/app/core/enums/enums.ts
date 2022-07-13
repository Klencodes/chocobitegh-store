export enum EmailVerify {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum PaymentOptionEnums {
  MOMO = 'Mobile Money',
  CARD = 'Card Payment',
  CASH = 'Cash Payment',
  BANK = 'Bank Payment',
}
export enum DelievryOptionEnums {
  NORMAL = 'NORMAL',
  EXPRESS = 'EXPRESS',
  PICK_UP = 'PICK_UP',

}
export enum NetworkProviders {
  MTN = 'MTN',
  AIR = 'AIRTEL',
  VODA = 'VODAFONE',
  TIGO = 'TIGO',
}
export enum ResponseStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
}
export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum UserType {
  FACTORY_ADMIN = 'FACTORY_ADMIN',
  SALES = 'SALES',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}
export const CategoriesData = [
  { name: 'Shop', value: '' },
  { name: 'Pre-Rolls', value: 'Pre-Rolls' },
  { name: 'Bakery', value: 'Bakery' }
]

export const SortData = [
  { name: 'Newest', value: 'Newest' },
  { name: 'Oldest', value: 'Oldest' },
  { name: 'Rating', value: 'Rating' },
];

export enum CartEnums {
  TAX = 0.05
}