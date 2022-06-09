export interface ProductUploadData {
  name: string;
  category: string;
  price: string;
  sku: string;
  description: string;
  weight: string;
  collections: string;
  tags: string;
  image: string;
  extra_product_images: string;
  
  // stock_availability: boolean;
  // product_state: string;
  // is_archived: boolean;
  // quantity: number;
  // barcode: number;
}
/**Customer */
export interface CustomerUploadData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  birth_date: string;
  gender: string;
  // image: string;
  // quantity: number;
  // barcode: number;
}
/**
 * Product Upload Columns mapping (server_name to client_name)
 */
export const productUploadColumnNames = [
  // {server_name: 'old_price', client_name: 'Old Price'}, 
  // {server_name: 'is_published', client_name: 'Published Publish'},
  // {server_name: 'stock_availability', client_name: 'Stock Availability'},
  // {server_name: 'product_state', client_name: 'Product State'},
  // {server_name: 'is_archived', client_name: 'Archived State'},
  {server_name: 'name', client_name: 'Name'},
  {server_name: 'category', client_name: 'Category'},
  {server_name: 'sku', client_name: 'SKU'},
  {server_name: 'price', client_name: 'Price'},
  {server_name: 'description', client_name: 'Description'},
  {server_name: 'weight', client_name: 'Weight'},
  {server_name: 'collections', client_name: 'Collections'},
  {server_name: 'image', client_name: 'Image'},
  {server_name: 'tags', client_name: 'Tags'},
  {server_name: 'extra_product_images', client_name: 'Extra Product Images'}, 
];
/**
 * Customer Upload Columns mapping (server_name to client_name)
 */
export const customerUploadColumnNames = [
  {server_name: 'first_name', client_name: 'First Name'},
  {server_name: 'last_name', client_name: 'Last Name'},
  {server_name: 'email', client_name: 'Email Address'},
  {server_name: 'phone_number', client_name: 'Phone Number'},
  {server_name: 'address', client_name: 'Address'},
  {server_name: 'address_2', client_name: 'Address 2 (Optional)'},
  {server_name: 'city', client_name: 'City'},
  {server_name: 'state', client_name: 'State'},
  {server_name: 'postal_code', client_name: 'Postal Code'},
  {server_name: 'country', client_name: 'Country'},
  {server_name: 'birth_date', client_name: 'Date of Birth'},
  {server_name: 'gender', client_name: 'Gender'},
  
  // {server_name: 'image', client_name: 'Image'},
  // {server_name: 'quantity', client_name: 'Quantity'},
  // {server_name: 'barcode', client_name: 'Barcode'},
];
