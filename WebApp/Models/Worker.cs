using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Worker 
    {
        public Guid UserId { get; set; }
        public string Specal { get; set; }
        public Order? Order { get; set; }
    }
}
