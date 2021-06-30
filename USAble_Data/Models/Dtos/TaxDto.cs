using System;

namespace USAble_Data.Models.Dtos
{
    public class TaxDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public bool Active { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public TaxDto(Taxes tax)
        {
            if (tax != null)
            {
                this.Id = tax.Id;
                this.Name = tax.Name;
                this.Amount = tax.Amount;
                this.Active = tax.Active;
                this.CreatedBy = tax.CreatedBy;
                this.CreatedDate = tax.CreatedDate;
                this.ModifiedBy = tax.ModifiedBy;
                this.ModifiedDate = tax.ModifiedDate;
            }
        }
    }
}
