using System;

namespace USAble_Data.Models.Dtos
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public int DiscountType { get; set; }
        public bool Active { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public DiscountDto(Discounts discount)
        {
            if (discount != null)
            {
                this.Id = discount.Id;
                this.Name = discount.Name;
                this.Amount = discount.Amount;
                this.DiscountType = discount.DiscountType;
                this.Active = discount.Active;
                this.CreatedBy = discount.CreatedBy;
                this.CreatedDate = discount.CreatedDate;
                this.ModifiedBy = discount.ModifiedBy;
                this.ModifiedDate = discount.ModifiedDate;
            }
        }
    }
}
