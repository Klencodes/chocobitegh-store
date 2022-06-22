export enum EmailVerify {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum PaymentOptionEnums {
  MOMO = 'MOMO',
  CARD = 'CARD',
  CASH = 'CASH',

}
export enum DelievryOptionEnums {
  NORMAL = 'NORMAL',
  EXPRESS = 'EXPRESS',
  PICK_UP = 'PICK_UP',

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

}

export enum UserType {
  TRAINING = 'TRAINING',
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