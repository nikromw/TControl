using Auth.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Resource.Api.Models;
using System;
using WriteModel;

namespace Resource.Api.Controlles
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookStore store;
        private WRContext _wrContext;

        public BooksController(BookStore strore , WRContext wRContext)
        {
            this.store = strore;
            _wrContext = wRContext;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAvailableBooks()
        {
            _wrContext.SaveChanges();
            return Ok(store.Books);
        }
    }
}
