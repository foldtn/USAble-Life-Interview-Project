using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly _USAbleDbContext _dbContext;

        public OrderService(_USAbleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Order Get()
        {
            throw new NotImplementedException();
        }

        public List<Order> GetAll()
        {
            throw new NotImplementedException();
        }

        public Order SubmitOrder()
        {
            throw new NotImplementedException();
        }
    }
}
