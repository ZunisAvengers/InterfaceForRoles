﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Worker 
    {
        [Key]
        public Guid Id { get; set; }
        public User User { get; set; }
        public string Specal { get; set; }
        //public Order? Order { get; set; }
    }
}
