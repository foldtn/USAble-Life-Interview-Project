namespace USAble_Data.Models.Responses
{
    public class OrderResponse
    {
        public Orders order { get; set; }
        public string errorMessage { get; set; }

        public OrderResponse(Orders order)
        {
            this.order = order;
        }

        public OrderResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }

        public OrderResponse(Orders order, string errorMessage)
        {
            this.order = order;
            this.errorMessage = errorMessage;
        }
    }
}
