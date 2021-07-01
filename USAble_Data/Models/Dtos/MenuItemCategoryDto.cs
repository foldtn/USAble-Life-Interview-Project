using System;

namespace USAble_Data.Models.Dtos
{
    public class MenuItemCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public MenuItemCategoryDto(MenuItemCategories category)
        {
            if (category != null)
            {
                this.Id = category.Id;
                this.Name = category.Name;
                this.Active = category.Active;
                this.CreatedBy = category.CreatedBy;
                this.ModifiedBy = category.ModifiedBy;
                this.ModifiedDate = category.ModifiedDate;
            }
        }
    }
}
