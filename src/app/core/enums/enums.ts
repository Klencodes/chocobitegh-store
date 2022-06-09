export enum EmailVerify {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum BulkUploadTemplatesEnum {
  BULK_PRODUCT_UPLOAD_TEMPLATE = 'BULK_PRODUCT_UPLOAD_TEMPLATE',
  BULK_CUSTOMER_UPLOAD_TEMPLATE = 'BULK_CUSTOMER_UPLOAD_TEMPLATE',
}

export enum ResponseStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',

}

export enum UserType {
  TRAINING = 'TRAINING',
  SALES = 'SALES',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER'
}
export enum AccessLevels {
  ADMIN = 'ADMIN',
  SALES = 'SALES',
  MANAGER = 'MANAGER',
  TRAINING = 'TRAINING',
}
export const ProductFeatures = [
  { id: 1, name: 'All', value: '' },
  { id: 2, name: 'Archived', value: 'ARCHIVED' },
  { id: 3, name: 'Published', value: 'PUBLISHED' },
  { id: 4, name: 'Unpublished', value: 'UNPUBLISHED' },
]

export enum DocTypes {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV',
}

export enum ExportingEnums {
  ALL_CSV = 'ALL_CSV',
  ALL_PDF = 'ALL_PDF',
  SELECTED_CSV = 'SELECTED_CSV',
  SELECTED_PDF = 'SELECTED_PDF',
}
export enum ExportPageType {
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  SELECTED_PRODUCTS = 'SELECTED_PRODUCTS',
  CURRENT_PAGE = 'CURRENT_PAGE',
}
export enum OrderStatus {
  ALL = 'ALL',
  OPEN = 'OPEN',
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  FULFILLED = 'FULFILLED',
  UNFULFILLED = 'UNFULFILLED',
  ARCHIVED = 'ARCHIVED',
  UNARCHIVED = 'UNARCHIVED',
  CANCEL = 'CANCEL'
}
export enum ProductStates {
  ALL = 'ALL',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
  ARCHIVED = 'ARCHIVED',
  UNARCHIVED = 'UNARCHIVED',
}
export enum CustomerTypes {
  ALL_CUSTOMERS = 'ALL_CUSTOMERS',
  NEW = 'NEW',
  RETURNING = 'RETURNING',
  ABANDONED_CHECKOUTS = 'ABANDONED_CHECKOUTS',
}
export enum CustomerRewardValues {
  GREEN = 'GREEN',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}
export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
}
export enum ReviewStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  DELETE = 'DELETE',
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