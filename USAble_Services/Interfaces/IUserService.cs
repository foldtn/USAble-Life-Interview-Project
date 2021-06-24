using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Data.Models.Requests;

namespace USAble_Services.Interfaces
{
    public interface IUserService
    {
        public User Authenticate(AuthenticateRequest model);
        public User GetById(int userId);
        public List<User> GetAll(); // Add Pagenation
        public User Update();
        public void Delete();
    }
}
