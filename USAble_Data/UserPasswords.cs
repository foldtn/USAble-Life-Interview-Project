// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace USAble_Data
{
    public partial class UserPasswords
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }

        public virtual Users User { get; set; }
    }
}