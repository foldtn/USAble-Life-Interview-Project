using System;
using System.Collections.Generic;
using USAble_Data;
using System.Linq;
using USAble_Services.Interfaces;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace USAble_Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly _DBContext _dbContext;

        public OrderService(_DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Orders GetById(int id)
        {
            return _dbContext.Orders
                .Include(x => x.Discount)
                .Include(x => x.OrderTaxes)
                .SingleOrDefault(x => x.Id == id);
        }

        public List<Orders> GetAll()
        {
            return _dbContext.Orders
                .Include(x => x.OrderMenuItems)
                .Include(x => x.OrderTaxes)
                .ToList();
        }

        public OrderResponse Create(OrderSubmitRequest request)
        {
            try
            {
                var newOrder = new Orders
                {
                    DiscountId = request.order.DiscountId,
                    Total = request.order.Total,
                    CreatedBy = request.order.CreatedBy,
                    CreatedDate = DateTime.UtcNow,
                };

                _dbContext.Orders.Add(newOrder);
                _dbContext.SaveChanges();

                foreach (var menuItem in request.menuItems)
                {
                    _dbContext.OrderMenuItems.Add(new OrderMenuItems
                    {
                        OrderId = newOrder.Id,
                        MenuItemId = menuItem.menuItem.Id,
                        Quantity = menuItem.Quantity
                    });
                }

                foreach (var tax in request.taxes)
                {
                    _dbContext.OrderTaxes.Add(new OrderTaxes
                    {
                        OrderId = newOrder.Id,
                        TaxId = tax.Id
                    });
                }

                _dbContext.SaveChanges();

                return new OrderResponse(_dbContext.Orders
                    .Include(x => x.OrderMenuItems)
                    .Include(x => x.OrderTaxes)
                    .SingleOrDefault(x => x.Id == newOrder.Id));
            }
            catch (Exception ex)
            {
                return new OrderResponse($"Error: {ex.Message}");
            }
        }
    }
}
