using System;

namespace USAble_Data.Models.Dtos
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public int? MenuItemCategoryId { get; set; }
        public bool Active { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public MenuItemDto(MenuItems menuItem)
        {
            if (menuItem != null)
            {
                this.Id = menuItem.Id;
                this.Name = menuItem.Name;
                this.Cost = menuItem.Cost;
                this.MenuItemCategoryId = menuItem.MenuItemCategoryId;
                this.Active = menuItem.Active;
                this.CreatedBy = menuItem.CreatedBy;
                this.CreatedDate = menuItem.CreatedDate;
                this.ModifiedBy = menuItem.ModifiedBy;
                this.ModifiedDate = menuItem.ModifiedDate;
            }
        }
    }
}
