using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IMenuItemCategoryService
    {
        public MenuItemCategories GetById(int id);
        public MenuItemCategories GetByName(string name);
        public List<MenuItemCategories> GetAll(); // Add Pagenation
        public MenuItemCategoryResponse Create(MenuItemCategories discount);
        public MenuItemCategoryResponse Update(MenuItemCategories category);
        public MenuItemCategoryResponse Delete(MenuItemCategories category);
    }
}
