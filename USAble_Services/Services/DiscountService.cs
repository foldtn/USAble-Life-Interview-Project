using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly _USAbleDbContext _dbContext;

        public DiscountService (_USAbleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Discount Get()
        {
            throw new NotImplementedException();
        }

        public List<Discount> GetAll()
        {
            throw new NotImplementedException();
        }

        public Discount Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }
    }
}
