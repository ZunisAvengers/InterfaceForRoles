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
                .Where(o => o.State != State.InstallatingСompleted && o.State != State.WaitingForInstallation)
                .ToListAsync();           
        }
        [HttpGet("Workers")]
        public async Task<IEnumerable<Worker>> GetWorkers()
        {
            return await _context.Workers
                .Include(w => w.User)
                .OrderBy(w => w.User.LastName)
                .ToListAsync();
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