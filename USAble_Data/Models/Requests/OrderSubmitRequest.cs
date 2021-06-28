using System.Collections.Generic;

namespace USAble_Data.Models.Requests
{
    public class OrderSubmitRequest
    {
        public Orders order { get; set; }
        public List<MenuItemRequest> menuItems { get; set; }
        public List<Taxes> taxes { get; set; }
    }
}
