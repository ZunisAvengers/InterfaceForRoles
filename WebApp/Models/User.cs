﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get { return $"{FirstName} {LastName}"; }
        }
        public string Phone { get; set; }
        public string Password { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
        public List<Order> Orders { get; set; }
        public User()
        {
            Orders = new List<Order>();
        }
    }
}
