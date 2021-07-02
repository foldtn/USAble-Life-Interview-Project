namespace USAble_Data.Models.Dtos
{
    public class OrderTaxDto
    {
        public int OrderId { get; set; }
        public int TaxId { get; set; }
        
        public OrderTaxDto(OrderTaxes orderTax)
        {
            this.OrderId = orderTax.OrderId;
            this.TaxId = orderTax.TaxId;
        }
    }
}
