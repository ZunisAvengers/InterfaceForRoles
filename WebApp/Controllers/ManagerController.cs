using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/manager")]
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
            IEnumerable<Order> orders = await _context.Orders
                .OrderByDescending(o => o.DateOrder)
                .ToArrayAsync();
            return orders;
        }
        [HttpPost("SetDateInstallation")]
        public async Task<ActionResult> SetDateInstallation([FromBody] Order order)
        {
            order.State = State.Installating;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("CancelOrder")]
        public async Task<ActionResult> CancelOrder([FromBody] Order order)
        {
            order.State = State.Canceled;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}