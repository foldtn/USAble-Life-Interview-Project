using System;
using System.Collections.Generic;

namespace USAble_Data.Models.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public decimal SubTotal { get; set; }
        public decimal PreTaxTotal { get; set; }
        public decimal TotalTaxAmount { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        
        public DiscountDto Discount { get; set; }
        public List<OrderMenuItemDto> MenuItems { get; set; }
        public List<TaxDto> Taxes { get; set; }

        public OrderDto(Orders order)
        {
            this.Id = order.Id;
            this.SubTotal = order.SubTotal;
            this.PreTaxTotal = order.PreTaxTotal;
            this.TotalTaxAmount = order.TotalTaxAmount;
            this.Total = order.Total;
            this.CreatedDate = order.CreatedDate;

            MenuItems = new List<OrderMenuItemDto>();
            Taxes = new List<TaxDto>();
        }

        public OrderDto(Orders order, Users user)
        {
            this.Id = order.Id;
            this.SubTotal = order.SubTotal;
            this.PreTaxTotal = order.PreTaxTotal;
            this.TotalTaxAmount = order.TotalTaxAmount;
            this.Total = order.Total;
            this.CreatedDate = order.CreatedDate;
            this.UserFirstName = user.FirstName;
            this.UserLastName = user.LastName;

            MenuItems = new List<OrderMenuItemDto>();
            Taxes = new List<TaxDto>();
        }
    }
}
