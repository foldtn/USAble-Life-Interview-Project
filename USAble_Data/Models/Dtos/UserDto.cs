using System;

namespace USAble_Data.Models.Dtos
{
    public class UserDto
    {
        public int? Id { get; set; }
        public int Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int UserRoleId { get; set; }
        public bool? Active { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public string Password { get; set; }

        public UserRoleDto UserRole { get; set; }

        public UserDto(Users user, string password = null)
        {
            setUser(user);

            this.Password = password;
        }

        public UserDto(Users user, UserRoles role)
        {
            setUser(user);
            setUserRole(role);
        }

        public UserDto(Users user, UserRoles role, string password = null)
        {
            setUser(user);
            setUserRole(role);

            this.Password = password;
        }

        private void setUser(Users user)
        {
            if (user != null)
            {
                this.Id = user.Id;
                this.Username = user.Username;
                this.FirstName = user.FirstName;
                this.LastName = user.LastName;
                this.UserRoleId = user.UserRoleId;
                this.Active = user.Active;
                this.CreatedBy = user.CreatedBy;
                this.CreatedDate = user.CreatedDate;
                this.ModifiedBy = user.ModifiedBy;
                this.ModifiedDate = user.ModifiedDate;
            }
        }

        private void setUserRole(UserRoles role)
        {
            if (role != null)
            {
                this.UserRole = new UserRoleDto(role);
            }
        }
    }
}
