using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;

namespace USAble_Services.Interfaces
{
    public interface IOrderService
    {
        public Order Get();
        public List<Order> GetAll(); // Add Pagenation
        public Order SubmitOrder();
    }
}
