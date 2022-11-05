using Microsoft.AspNetCore.Mvc;
using Resource.Api.Models;
using System;
using WriteModel;

namespace Resource.Api.Controlles
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        WRContext _dbContext;

        public NoteController(WRContext dbContextb)
        {
            _dbContext = dbContextb;
        }

        [HttpGet]
        [Route("noteList")]
        public IActionResult GetNoteList() =>  Ok();

        [HttpPost]
        [Route("createNote")]
        public IActionResult CreateNote([FromBody]LittleNote note)
        {
            try
            {
                _dbContext.LittleNotes.Add(new LittleNote()
                {
                    Title = note.Title,
                    Body = note.Body,
                    AccountId = Guid.Parse("0ED16120-3AB8-4582-8475-EC5B5A0BF540")
                }) ;

                _dbContext.SaveChanges();

            }catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
