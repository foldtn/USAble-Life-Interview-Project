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
                .Include(x => x.OrderMenuItems)
                .Include(x => x.OrderTaxes)
                .SingleOrDefault(x => x.Id == id);
        }

        public List<Orders> GetAll()
        {
            return _dbContext.Orders
                .Include(x => x.OrderMenuItems)
                .Include(x => x.OrderTaxes)
                .OrderByDescending(x => x.CreatedDate)
                .ThenByDescending(x => x.Id)
                .ToList();
        }

        public OrderResponse Create(OrderRequest request)
        {
            using var transction = _dbContext.Database.BeginTransaction();

            var newOrder = new Orders
            {
                DiscountId = request.order.DiscountId,
                SubTotal = decimal.Round(request.order.SubTotal, 2),
                PreTaxTotal = decimal.Round(request.order.PreTaxTotal, 2),
                TotalTaxAmount = request.order.TotalTaxAmount,
                Total = decimal.Round(request.order.Total, 2),
                CreatedBy = request.order.CreatedBy,
                CreatedDate = DateTime.UtcNow,
            };

            _dbContext.Orders.Add(newOrder);
            _dbContext.SaveChanges();

            foreach (var itemRequest in request.menuItemRequests)
            {
                _dbContext.OrderMenuItems.Add(new OrderMenuItems
                {
                    OrderId = newOrder.Id,
                    MenuItemId = itemRequest.menuItem.Id,
                    Quantity = itemRequest.Quantity
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

            transction.Commit();

            return new OrderResponse(_dbContext.Orders
                .Include(x => x.OrderMenuItems)
                .Include(x => x.OrderTaxes)
                .SingleOrDefault(x => x.Id == newOrder.Id));
        }
    }
}
