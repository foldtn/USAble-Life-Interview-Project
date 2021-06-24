using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Data.Models.Requests;
using USAble_Services.Interfaces;

namespace USAble_Services.Services
{
    public class UserService : IUserService
    {
        private readonly _USAbleDbContext _dbContext;

        public UserService(_USAbleDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public User Authenticate(AuthenticateRequest model)
        {
            throw new NotImplementedException();
        }

        public User GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }
    }
}
