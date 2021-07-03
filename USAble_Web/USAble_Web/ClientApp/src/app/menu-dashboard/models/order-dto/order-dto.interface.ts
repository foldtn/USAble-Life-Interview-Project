import { Discount } from '../../../discount-dashboard/models/discount.interface';
import { OrderMenuItemDto } from './order-menu-item-dto';
import { Tax } from '../../../tax-dashboard/models/tax.interface';

export interface OrderDto {
  Id: number,
  SubTotal: number,
  PreTaxTotal: number,
  TotalTaxAmount: number,
  Total: number,
  CreatedDate: Date,
  UserFirstName: string,
  UserLastName: string,
  Discount: Discount,
  MenuItems: OrderMenuItemDto[],
  Taxes: Tax[]
}
