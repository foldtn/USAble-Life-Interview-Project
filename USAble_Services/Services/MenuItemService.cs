using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly _USAbleDbContext _dbContext;

        public MenuItemService(_USAbleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public MenuItem Get()
        {
            throw new NotImplementedException();
        }

        public List<MenuItem> GetAll()
        {
            throw new NotImplementedException();
        }

        public MenuItem Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }
    }
}
