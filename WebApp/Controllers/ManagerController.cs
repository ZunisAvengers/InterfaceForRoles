using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using WebApp.ViewModel;

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
        public async Task<IEnumerable<ManagerOrderView>> GetOrders()
        {
            List<Order> orders = await _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.DateOrder)
                .ToListAsync();
            List<ManagerOrderView> orderView = new List<ManagerOrderView>();
            foreach(var order in orders) 
                orderView.Add(new ManagerOrderView(order));
            return orderView.ToArray();
        }
        [HttpPost("SetDateInstallation")]
        public async Task<ActionResult> SetDateInstallation([FromBody] Order order)
        {
            order.State = State.WaitingForInstallation;
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
        //[HttpGet("Workers")]
        //public async Task<>
    }
}