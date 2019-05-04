import { ProductDto } from './product.dto';

export interface CartItem {
  amount: number;
  product: ProductDto;
}
