using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IUserService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);
        public Users GetById(int userId);
        public Users GetByUsername(string username);
        public List<Users> GetAll(); // Add Pagenation
        public UserResponse Create(Users discount, UserPasswords password);
        public UserResponse Update(Users user, UserPasswords password = null);
        public UserResponse Delete(Users user);
    }
}
