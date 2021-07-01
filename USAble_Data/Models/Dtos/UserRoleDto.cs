using System;

namespace USAble_Data.Models.Dtos
{
    public class UserRoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public UserRoleDto(UserRoles role)
        {
            if (role != null)
            {
                this.Id = role.Id;
                this.Name = role.Name;
                this.Active = role.Active;
                this.CreatedDate = role.CreatedDate;
                this.ModifiedDate = role.ModifiedDate;
            }
        }
    }
}
