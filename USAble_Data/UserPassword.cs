﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace USAble_Data
{
    public partial class UserPassword
    {
        public int Id { get; set; }
        public byte[] Password { get; set; }
        public string Salt { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}