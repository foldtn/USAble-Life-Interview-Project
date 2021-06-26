using System;
using System.Collections.Generic;
using System.Text;
using USAble_Data;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IUserService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);
        public User GetById(int userId);
        public List<User> GetAll(); // Add Pagenation
        public User Update();
        public void Delete();
    }
}
