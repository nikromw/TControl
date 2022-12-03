using Microsoft.AspNetCore.Mvc;
using Resource.Api.Models;
using System;
using System.Linq;
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
        public IActionResult GetNoteList() {

            var qwe = _dbContext.LittleNotes.Where(x => x.AccountId == WRContext.Account.Id).ToList();
           return Ok(qwe);
        }

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
                    AccountId = WRContext.Account.Id,
                    FilePath = note.FilePath
                });

                _dbContext.SaveChanges();

            }catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("deleteNote")]
        public IActionResult DeleteNote([FromBody] LittleNote note)
        {
            try
            {

                var noteToDelete = _dbContext.LittleNotes.FirstOrDefault(x => x.Id == note.Id);

                if (noteToDelete != null)
                    _dbContext.LittleNotes.Remove(noteToDelete);

                _dbContext.SaveChanges();

            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            return Ok();
        }
    }
}
