using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users{ get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Role workmanRole = new Role { Id = Guid.NewGuid(), Name = "Workman" };
            Role userRole = new Role { Id = Guid.NewGuid(), Name = "User" };
            Role managerRole = new Role { Id = Guid.NewGuid(), Name = "Manager" };
            User manager = new User
            {
                Id = Guid.NewGuid(),
                RoleId = managerRole.Id,
                FirstName = "manager",
                LastName = "manager",
                Login = "Manager",
                Phone = "000000000",
                Password = "Manager"
            };
            modelBuilder.Entity<Role>().HasData(new Role[] { workmanRole, userRole, managerRole });
            modelBuilder.Entity<User>().HasData(new User[] { manager });  
            base.OnModelCreating(modelBuilder);
        }
    }
}