using Microsoft.AspNetCore.Mvc;
using Resource.Api.Models;
using WriteModel;

namespace Resource.Api.Controlles
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookStore store;

        public BooksController(BookStore strore)
        {
            this.store = strore;
        }

        [HttpGet]
        [Route("")]
        public IActionResult GetAvailableBooks()
        {
            return Ok(store.Books);
        }
    }
}
