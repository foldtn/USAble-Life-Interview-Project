using System.Collections.Generic;

namespace USAble_Data.Models.Requests
{
    public class OrderRequest
    {
        public Orders order { get; set; }
        public List<MenuItemRequest> menuItemRequests { get; set; }
        public List<Taxes> taxes { get; set; }
    }
}
