﻿namespace USAble_Data.Models.Dtos
{
    public class OrderMenuItemDto
    {
        public int OrderId { get; set; }
        public int MenuItemId { get; set; }
        public int Quantity { get; set; }

        public OrderMenuItemDto(OrderMenuItems items)
        {
            OrderId = items.OrderId;
            MenuItemId = items.MenuItemId;
            Quantity = items.Quantity;
        }
    }
}
