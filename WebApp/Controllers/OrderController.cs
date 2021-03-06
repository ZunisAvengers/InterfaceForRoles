﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/order")]
    [Authorize]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public OrderController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _context.Orders
                .Where(o => o.Customer.Id.ToString() == User.Identity.Name)
                .OrderByDescending(o => o.DateOrder)
                .ToListAsync();

        }
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Order>> GetOrder(Guid id)
        //{
        //    Order order = await _context.Orders
        //        .FirstOrDefaultAsync(o => o.Id == id);
        //    if (order != null) return order;
        //    return NotFound();
        //}
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder([FromBody]Order order)
        {
            order.DateOrder = DateTime.Now;
            order.Customer = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == User.Identity.Name);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }
    }
}
