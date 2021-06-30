namespace USAble_Data.Models.Responses
{
    public class TaxResponse
    {
        public Taxes tax { get; set; }
        public string errorMessage { get; set; }

        public TaxResponse(Taxes tax)
        {
            this.tax = tax;
        }

        public TaxResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }

        public TaxResponse(Taxes tax, string errorMessage)
        {
            this.tax = tax;
            this.errorMessage = errorMessage;
        }
    }
}
