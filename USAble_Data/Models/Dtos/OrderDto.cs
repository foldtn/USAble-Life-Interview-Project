using System;
using System.Collections.Generic;

namespace USAble_Data.Models.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int? DiscountId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal PreTaxTotal { get; set; }
        public decimal TotalTaxAmount { get; set; }
        public decimal Total { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<OrderMenuItemDto> menuItems { get; set; }
        public List<OrderTaxDto> taxes { get; set; }

        public OrderDto(Orders order)
        {
            this.Id = order.Id;
            this.DiscountId = order.DiscountId;
            this.SubTotal = order.SubTotal;
            this.PreTaxTotal = order.PreTaxTotal;
            this.TotalTaxAmount = order.TotalTaxAmount;
            this.Total = order.Total;
            this.CreatedBy = order.CreatedBy;
            this.CreatedDate = order.CreatedDate;

            foreach(var menuItem in order.OrderMenuItems)
            {
                this.menuItems.Add(new OrderMenuItemDto(menuItem));
            }

            foreach(var tax in order.OrderTaxes)
            {
                this.taxes.Add(new OrderTaxDto(tax));
            }
        }
    }
}
