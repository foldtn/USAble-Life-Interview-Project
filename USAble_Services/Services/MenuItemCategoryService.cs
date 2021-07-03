using System;
using System.Collections.Generic;
using USAble_Data;
using System.Linq;
using USAble_Services.Interfaces;
using USAble_Data.Models.Responses;

namespace USAble_Services.Services
{
    public class MenuItemCategoryService : IMenuItemCategoryService
    {
        private readonly _DBContext _dbContext;

        public MenuItemCategoryService(_DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public MenuItemCategories GetById(int id)
        {
            return _dbContext.MenuItemCategories.SingleOrDefault(x => x.Id == id);
        }

        public MenuItemCategories GetByName(string name)
        {
            return _dbContext.MenuItemCategories.Where(x => x.Active).SingleOrDefault(x => x.Name == name);
        }

        public List<MenuItemCategories> GetAll()
        {
            return _dbContext.MenuItemCategories.Where(x => x.Active).ToList(); 
        }

        public MenuItemCategoryResponse Create(MenuItemCategories category)
        {
            var existingCategory = GetByName(category.Name);
            var newCategory = new MenuItemCategories();

            if (existingCategory != null)
            {
                return new MenuItemCategoryResponse(category, $"{category.Name} already exists");
            }

            newCategory.Name = category.Name;
            newCategory.Active = true;
            newCategory.CreatedBy = category.CreatedBy;
            newCategory.CreatedDate = DateTime.UtcNow;

            _dbContext.MenuItemCategories.Add(newCategory);
            _dbContext.SaveChanges();

            return new MenuItemCategoryResponse(newCategory);
        }

        public MenuItemCategoryResponse Update(MenuItemCategories category)
        {
            var categoryToUpdate = GetById(category.Id);

            if (categoryToUpdate == null) return new MenuItemCategoryResponse($"The category you're trying to update does not exist");

            var existingCategory = GetByName(category.Name);

            if (existingCategory != null)
            {
                return new MenuItemCategoryResponse(category, $"{category.Name} already exists");
            }

            categoryToUpdate.Name = category.Name;
            categoryToUpdate.ModifiedBy = category.ModifiedBy;
            categoryToUpdate.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new MenuItemCategoryResponse(categoryToUpdate);
        }

        public MenuItemCategoryResponse Delete(MenuItemCategories category)
        {
            var updatedCategory = GetById(category.Id);

            if (updatedCategory == null) return new MenuItemCategoryResponse("The menu item category you're trying to delete does not exist");

            updatedCategory.Active = false;
            updatedCategory.ModifiedBy = category.ModifiedBy;
            updatedCategory.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new MenuItemCategoryResponse(updatedCategory);
        }
    }
}
