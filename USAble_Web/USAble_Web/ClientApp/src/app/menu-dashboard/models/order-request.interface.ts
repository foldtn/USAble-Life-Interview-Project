import { Order } from './order.interface';
import { MenuItemOrderRequest } from './menu-item-order-request.interface';
import { Tax } from '../../tax-dashboard/models/tax.interface';

export interface OrderRequest {
  order: Order,
  menuItemRequests: MenuItemOrderRequest[],
  taxes: Tax[]
}
