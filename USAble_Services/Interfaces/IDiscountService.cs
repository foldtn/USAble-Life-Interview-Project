using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IDiscountService
    {
        public Discounts GetById(int id);
        public Discounts GetByName(string name);
        public List<Discounts> GetAll(); // Add Pagenation
        public DiscountResponse Create(Discounts discount);
        public DiscountResponse Update(Discounts discount);
        public DiscountResponse Delete(Discounts discount);
    }
}
