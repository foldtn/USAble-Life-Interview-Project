using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;

namespace USAble_Services.Interfaces
{
    public interface IMenuItemService
    {
        public MenuItem Get();
        public List<MenuItem> GetAll(); // Add Pagenation
        public MenuItem Update();
        public void Delete();
    }
}
