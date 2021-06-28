using System;
using System.Collections.Generic;
using System.Text;

namespace USAble_Data.Models.Requests
{
    public class UserRequest
    {
        public Users User { get; set; }
        public UserPasswords Password { get; set; }
    }
}
