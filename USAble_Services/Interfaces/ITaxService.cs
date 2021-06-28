using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Dtos;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface ITaxService
    {
        public Taxes GetById(int id);
        public Taxes GetByName(string name);
        public List<Taxes> GetAll(); // Add Pagenation
        public TaxResponse Create(Taxes discount);
        public TaxResponse Update(Taxes tax);
        public TaxResponse Delete(Taxes tax);
    }
}
