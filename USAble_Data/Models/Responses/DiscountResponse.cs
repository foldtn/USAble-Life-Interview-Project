namespace USAble_Data.Models.Responses
{
    public class DiscountResponse
    {
        public Discounts discount { get; set; }
        public string errorMessage { get; set; }

        public DiscountResponse(Discounts discount)
        {
            this.discount = discount;
        }

        public DiscountResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }
    }
}
