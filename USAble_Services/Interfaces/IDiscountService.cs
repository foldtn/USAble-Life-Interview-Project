using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;

namespace USAble_Services.Interfaces
{
    public interface IDiscountService
    {
        public Discount Get();
        public List<Discount> GetAll(); // Add Pagenation
        public Discount Update();
        public void Delete();
    }
}
