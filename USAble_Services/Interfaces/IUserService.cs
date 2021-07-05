using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Dtos;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;

namespace USAble_Services.Interfaces
{
    public interface IUserService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);
        public Users GetById(int userId);
        public Users GetByUsername(int username);
        public UserRoles GetUserRoleById(int id);
        public List<UserRoles> GetUserRoles();
        public List<int> GetAllUsernames();
        public List<Users> GetAll(int userId); // Add Pagenation
        public UserResponse Create(Users user);
        public UserResponse Update(Users user);
        public UserResponse Delete(Users user);
        public UserResponse ResetPassword(UserRequest request);
    }
}
