using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class TaxService : ITaxService
    {
        private readonly _USAbleDbContext _dbContext;

        public TaxService(_USAbleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Tax Get()
        {
            throw new NotImplementedException();
        }

        public List<Tax> GetAll()
        {
            throw new NotImplementedException();
        }

        public Tax Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }
    }
}
