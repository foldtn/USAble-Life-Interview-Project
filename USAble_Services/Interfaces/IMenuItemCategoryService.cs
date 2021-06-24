using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;

namespace USAble_Services.Interfaces
{
    public interface IMenuItemCategoryService
    {
        public MenuItemCategory Get();
        public List<MenuItemCategory> GetAll(); // Add Pagenation
        public MenuItemCategory Update();
        public void Delete();
    }
}
