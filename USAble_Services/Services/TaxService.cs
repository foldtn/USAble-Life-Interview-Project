using System;
using System.Collections.Generic;
using System.Linq;
using USAble_Data;
using USAble_Data.Models.Responses;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class TaxService : ITaxService
    {
        private readonly _DBContext _dbContext;

        public TaxService(_DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Taxes GetById(int id)
        {
            return _dbContext.Taxes.SingleOrDefault(x => x.Id == id);
        }

        public Taxes GetByName(string name)
        {
            return _dbContext.Taxes.Where(x => x.Active).SingleOrDefault(x => x.Name == name);
        }

        public List<Taxes> GetAll()
        {
            return _dbContext.Taxes.Where(x => x.Active).ToList();
        }

        public TaxResponse Create(Taxes tax)
        {
            var existingTax = GetByName(tax.Name);
            var newTax = new Taxes();

            if (existingTax != null)
            {
                return new TaxResponse(tax, $"{tax.Name} already exists");
            }

            newTax.Name = tax.Name;
            newTax.Amount = tax.Amount;
            newTax.Active = true;
            newTax.CreatedBy = tax.CreatedBy;
            newTax.CreatedDate = DateTime.UtcNow;

            _dbContext.Taxes.Add(newTax);
            _dbContext.SaveChanges();

            return new TaxResponse(newTax);
        }

        public TaxResponse Update(Taxes tax)
        {
            var taxToUpdate = GetById(tax.Id);

            if (taxToUpdate == null) return new TaxResponse($"The tax you're trying to update does not exist");

            var existingTax = GetByName(tax.Name);

            if (existingTax != null)
            {
                return new TaxResponse(tax, $"{tax.Name} already exists");
            }

            taxToUpdate.Name = tax.Name;
            taxToUpdate.Amount = tax.Amount;
            taxToUpdate.ModifiedBy = tax.ModifiedBy;
            taxToUpdate.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new TaxResponse(taxToUpdate);
        }

        public TaxResponse Delete(Taxes tax)
        {
            var updatedTax = GetById(tax.Id);

            if (updatedTax == null) return new TaxResponse($"The tax you're trying to delete does not exist");

            updatedTax.Active = false;
            updatedTax.ModifiedBy = tax.ModifiedBy;
            updatedTax.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new TaxResponse(updatedTax);
        }
    }
}
