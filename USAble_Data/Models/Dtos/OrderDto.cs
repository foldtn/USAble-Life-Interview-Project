using System;
using System.Collections.Generic;
using USAble_Data.Models.Requests;

namespace USAble_Data.Models.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public decimal SubTotal { get; set; }
        public decimal PreTaxTotal { get; set; }
        public decimal TotalTaxAmount { get; set; }
        public decimal Total { get; set; }

        public DiscountDto Discount { get; set; }
        public UserDto User { get; set; }
        public List<MenuItemRequest> MenuItems { get; set; }
        public List<TaxDto> Taxes { get; set; }
        public List<MenuItemCategoryDto> Categories { get; set; }

        public OrderDto(Orders order)
        {
            this.Id = order.Id;
            this.SubTotal = order.SubTotal;
            this.PreTaxTotal = order.PreTaxTotal;
            this.TotalTaxAmount = order.TotalTaxAmount;
            this.Total = order.Total;
        }
    }
}
