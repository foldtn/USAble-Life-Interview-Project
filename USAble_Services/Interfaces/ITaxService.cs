using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;

namespace USAble_Services.Interfaces
{
    public interface ITaxService
    {
        public Tax Get();
        public List<Tax> GetAll(); // Add Pagenation
        public Tax Update();
        public void Delete();
    }
}
