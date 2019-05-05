import { RefDto } from './ref.dto';
import { PaymentDto } from './payment.dto';
import { ItemOrderDto } from './item-order.dto';

export interface OrderDto {
  client: RefDto;
  addressDelivery: RefDto;
  payment: PaymentDto;
  items: ItemOrderDto[];
}
