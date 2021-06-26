using System;
using System.Collections.Generic;
using System.Text;

namespace USAble_Data.Models.Responses
{
    public class AuthenticateResponse
    {
        public User User { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            User = user;
            Token = token;
        }
    }
}
