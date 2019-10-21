using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/identity")]
    public class IdentityController : Controller
    {
        private readonly ApplicationContext _context;

        public IdentityController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpPost("/Reg")]
        public async Task<ActionResult<User>> Reg(User model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == model.Password);
            if (user == null)
            {
                Role role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
                user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Login = model.Login,
                    Password = model.Password,
                    Phone = model.Phone,
                    Role = role,
                    RoleId = role.Id
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                await Authenticate(user);
                return user;
            }
            return BadRequest();
        }
        [HttpPost("/Login")]
        public async Task<ActionResult<User>> LogIn(User model)
        {
            User user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == model.Password);
            if (user != null)
            {
                await Authenticate(user);
                return user;
            }
            return NotFound();
        }
        [NonAction]
        public async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

       [HttpPost("/LogOut")]
       public async Task LogOut()
       {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
       }
    }
}
