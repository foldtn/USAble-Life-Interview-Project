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
            return _dbContext.Taxes.SingleOrDefault(x => x.Name == name);
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
                if (existingTax.Active) 
                {
                    return new TaxResponse($"{tax.Name} already exists");
                }
                else
                {
                    // Reactivate tax item with amount user wanted to create with
                    existingTax.Active = true;
                    existingTax.Amount = tax.Amount;
                    existingTax.ModifiedBy = tax.CreatedBy;
                    existingTax.ModifiedDate = DateTime.UtcNow;
                }
            }
            else
            {
                newTax.Name = tax.Name;
                newTax.Amount = tax.Amount;
                newTax.Active = true;
                newTax.CreatedBy = tax.CreatedBy;
                newTax.CreatedDate = DateTime.UtcNow;

                _dbContext.Taxes.Add(newTax);
            }

            _dbContext.SaveChanges();

            return new TaxResponse((existingTax != null) ? existingTax : newTax);
        }

        public TaxResponse Update(Taxes tax)
        {
            var taxToUpdate = GetById(tax.Id);

            if (taxToUpdate == null) return new TaxResponse($"The tax you're trying to update does not exist");

            var existingTax = GetByName(tax.Name);

            if (existingTax != null)
            {
                if (existingTax.Active)
                {
                    return new TaxResponse($"{tax.Name} already exists");
                }
                else
                {
                    // Reactivate tax item with amount user wanted to create with
                    existingTax.Active = true;
                    existingTax.Amount = tax.Amount;
                    existingTax.ModifiedBy = tax.ModifiedBy;
                    existingTax.ModifiedDate = DateTime.UtcNow;

                    taxToUpdate.Active = false;
                    taxToUpdate.ModifiedBy = tax.ModifiedBy;
                    taxToUpdate.ModifiedDate = DateTime.UtcNow;
                }
            }
            else
            {
                taxToUpdate.Name = tax.Name;
                taxToUpdate.Amount = tax.Amount;
                taxToUpdate.ModifiedBy = tax.ModifiedBy;
                taxToUpdate.ModifiedDate = DateTime.UtcNow;
            }

            _dbContext.SaveChanges();

            return new TaxResponse(existingTax == null ? taxToUpdate : existingTax);
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
