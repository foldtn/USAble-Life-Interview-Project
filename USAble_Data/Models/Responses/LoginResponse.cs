using System;
using System.Collections.Generic;
using System.Text;

namespace USAble_Data.Models.Responses
{
    public class LoginResponse
    {
        public User User { get; set; }
        public string Token { get; set; }

        public LoginResponse(User user, string token)
        {
            User = user;
            Token = token;
        }
    }
}
