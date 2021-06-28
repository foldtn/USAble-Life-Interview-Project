using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IOrderService
    {
        public Orders GetById(int id);
        public List<Orders> GetAll(); // Add Pagenation
        public OrderResponse Create(OrderSubmitRequest order);
    }
}
