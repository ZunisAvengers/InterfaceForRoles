using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/Manager")]
    [Authorize(Roles = "Manager")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public ManagerController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet("Orders")]
        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.DateOrder)
                .ToListAsync();
        }
        [HttpPost("SetDateInstallation")]
        public async Task<ActionResult> SetDateInstallation([FromBody] Order order)
        {
            Order _order = await _context.Orders.FirstOrDefaultAsync(o => o == order);
            if (_order == null) return NotFound();
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}