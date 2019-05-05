import { RefDto } from './ref.dto';

export interface ItemOrderDto {
  amount: number;
  product: RefDto;
}
