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
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Role workmanRole = new Role { Id = Guid.NewGuid(), Name = "Workman" };
            Role userRole = new Role { Id = Guid.NewGuid(), Name = "User" };
            Role managerRole = new Role { Id = Guid.NewGuid(), Name = "Manager" };
            modelBuilder.Entity<Role>().HasData(new Role[] { workmanRole, userRole, managerRole });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}