using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IMenuItemService
    {
        public MenuItems GetById(int id);
        public MenuItems GetByName(string name);
        public List<MenuItems> GetAll(); // Add Pagenation
        public MenuItemResponse Create(MenuItems discount);
        public MenuItemResponse Update(MenuItems menuItem);
        public MenuItemResponse Delete(MenuItems menuItem);
    }
}
