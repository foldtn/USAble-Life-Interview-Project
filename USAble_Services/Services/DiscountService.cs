using System;
using System.Collections.Generic;
using USAble_Data;
using System.Linq;
using USAble_Services.Interfaces;
using USAble_Data.Models.Responses;

namespace USAble_Services.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly _DBContext _dbContext;

        public DiscountService (_DBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Discounts GetById(int id)
        {
            return _dbContext.Discounts.SingleOrDefault(x => x.Id == id);
        }

        public Discounts GetByName(string name)
        {
            return _dbContext.Discounts.SingleOrDefault(x => x.Name == name);
        }

        public List<Discounts> GetAll()
        {
            return _dbContext.Discounts.Where(x => x.Active).ToList();
        }

        public DiscountResponse Create(Discounts discount)
        {
            var existingDiscount = GetByName(discount.Name);
            var newDiscount = new Discounts();

            if (existingDiscount != null)
            {
                if (existingDiscount.Active)
                {
                    return new DiscountResponse(discount, $"{discount.Name} already exists");
                }
                else
                {
                    // Reactivate discount item with amount user wanted to create with
                    existingDiscount.Active = true;
                    existingDiscount.Amount = discount.Amount;
                    existingDiscount.ModifiedBy = discount.CreatedBy;
                    existingDiscount.ModifiedDate = DateTime.UtcNow;
                }
            }
            else
            {
                newDiscount.Name = discount.Name;
                newDiscount.Amount = discount.Amount;
                newDiscount.Active = true;
                newDiscount.CreatedBy = discount.CreatedBy;
                newDiscount.CreatedDate = DateTime.UtcNow;

                _dbContext.Discounts.Add(newDiscount);
            }

            _dbContext.SaveChanges();

            return new DiscountResponse(existingDiscount == null ? newDiscount : existingDiscount);
        }

        public DiscountResponse Update(Discounts discount)
        {
            var discountToUpdate = GetById(discount.Id);

            if (discountToUpdate == null) return new DiscountResponse($"The discount you're trying to update does not exist");

            var existingDiscount = GetByName(discount.Name);

            if (existingDiscount != null && existingDiscount.Id != discountToUpdate.Id)
            {
                if (existingDiscount.Active)
                {
                    return new DiscountResponse(discount, $"{discount.Name} already exists");
                }
                else
                {
                    // Reactivate discount item with amount user wanted to create with
                    existingDiscount.Active = true;
                    existingDiscount.Amount = discount.Amount;
                    existingDiscount.ModifiedBy = discount.ModifiedBy;
                    existingDiscount.ModifiedDate = DateTime.UtcNow;

                    discountToUpdate.Active = false;
                    discountToUpdate.ModifiedBy = discount.ModifiedBy;
                    discountToUpdate.ModifiedDate = DateTime.UtcNow;
                }
            }
            else
            {
                discountToUpdate.Name = discount.Name;
                discountToUpdate.Amount = discount.Amount;
                discountToUpdate.ModifiedBy = discount.ModifiedBy;
                discountToUpdate.ModifiedDate = DateTime.UtcNow;
            }

            _dbContext.SaveChanges();

            return new DiscountResponse(existingDiscount == null ? discountToUpdate : existingDiscount);
        }

        public DiscountResponse Delete(Discounts discount)
        {
            var updatedDiscount = GetById(discount.Id);

            if (updatedDiscount == null) return new DiscountResponse($"The discount you're trying to delete does not exist");

            updatedDiscount.Active = false;
            updatedDiscount.ModifiedBy = discount.ModifiedBy;
            updatedDiscount.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new DiscountResponse(updatedDiscount);
        }
    }
}
