using System;
using System.Collections.Generic;
using USAble_Data;
using System.Linq;
using USAble_Services.Interfaces;
using USAble_Data.Models.Responses;

namespace USAble_Services.Services
{
    public class MenuItemService : IMenuItemService
    {
        private readonly _DBContext _dbContext;

        public MenuItemService(_DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public MenuItems GetById(int id)
        {
            return _dbContext.MenuItems.SingleOrDefault(x => x.Id == id); ;
        }

        public MenuItems GetByName(string name)
        {
            return _dbContext.MenuItems.SingleOrDefault(x => x.Name == name);
        }

        public List<MenuItems> GetAll()
        {
            return _dbContext.MenuItems.ToList();
        }

        public MenuItemResponse Create(MenuItems menuItem)
        {
            var existingMenuItem = GetByName(menuItem.Name);
            var newMenuItem = new MenuItems();

            if (existingMenuItem != null)
            {
                if (existingMenuItem.Active)
                {
                    return new MenuItemResponse($"{menuItem.Name} already exists");
                }
                else
                {
                    // Reactivate tax item with amount user wanted to create with
                    existingMenuItem.Active = true;
                    existingMenuItem.Cost = menuItem.Cost;
                    existingMenuItem.MenuItemCategoryId = menuItem.MenuItemCategoryId;
                    existingMenuItem.ModifiedBy = menuItem.CreatedBy;
                    existingMenuItem.ModifiedDate = DateTime.UtcNow;
                }
            }
            else
            {
                newMenuItem.Name = menuItem.Name;
                newMenuItem.Cost = menuItem.Cost;
                newMenuItem.MenuItemCategoryId = menuItem.MenuItemCategoryId;
                newMenuItem.Active = true;
                newMenuItem.CreatedBy = menuItem.CreatedBy;
                newMenuItem.CreatedDate = DateTime.UtcNow;

                _dbContext.MenuItems.Add(newMenuItem);
            }

            _dbContext.SaveChanges();

            return new MenuItemResponse((existingMenuItem != null) ? existingMenuItem : newMenuItem);
        }

        public MenuItemResponse Update(MenuItems menuItem)
        {
            var updatedMenuItem = GetById(menuItem.Id);

            if (updatedMenuItem == null) return new MenuItemResponse($"The tax you're trying to update does not exist");

            updatedMenuItem.Name = menuItem.Name;
            updatedMenuItem.Cost = menuItem.Cost;
            updatedMenuItem.MenuItemCategoryId = menuItem.MenuItemCategoryId;
            updatedMenuItem.ModifiedBy = menuItem.ModifiedBy;
            updatedMenuItem.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new MenuItemResponse(updatedMenuItem);
        }

        public MenuItemResponse Delete(MenuItems menuItem)
        {
            var updatedMenuItem = GetById(menuItem.Id);

            if (updatedMenuItem == null) return new MenuItemResponse($"The tax you're trying to delete does not exist");

            updatedMenuItem.Active = false;
            updatedMenuItem.ModifiedBy = menuItem.ModifiedBy;
            updatedMenuItem.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new MenuItemResponse(updatedMenuItem);
        }
    }
}
