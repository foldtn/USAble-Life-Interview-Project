using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace USAble_Data.Models.Requests
{
    public class AuthenticateRequest
    {
        [Required]
        public int Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
