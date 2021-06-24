using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class MenuItemCategoryService : IMenuItemCategoryService
    {
        private readonly _USAbleDbContext _dbContext;

        public MenuItemCategoryService(_USAbleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public MenuItemCategory Get()
        {
            throw new NotImplementedException();
        }

        public List<MenuItemCategory> GetAll()
        {
            throw new NotImplementedException();
        }

        public MenuItemCategory Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }
    }
}
