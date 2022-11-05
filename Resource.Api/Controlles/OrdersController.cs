using Auth.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Resource.Api.Models;
using System;
using System.Linq;
using System.Security.Claims;
using WriteModel;

namespace Resource.Api.Controlles
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly BookStore store;
        private readonly WRContext _wrContext;

        private Guid UserId => Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);

        public OrdersController(BookStore strore , WRContext wRContext)
        {
            this.store = strore;
            _wrContext = wRContext;
        }

        [HttpGet]
        [Authorize (Roles = "Admin")]
        [Route("")]
        public IActionResult GetOrders()
        {
            if (!store.Orders.ContainsKey(UserId)) return Ok(Enumerable.Empty<Book>());

            var orderBookIds = store.Orders.Single(o => o.Key == UserId).Value;
            var orderedBooks = store.Books.Where(b => orderBookIds.Contains(b.Id));


            return Ok(orderedBooks);
        }
    }
}
