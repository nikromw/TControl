using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadModel.Models;
using System.Linq;
using WriteModel;

namespace Resource.Api.Controlles
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteSettingController : ControllerBase
    {
        private WRContext _dbContext;

        public NoteSettingController(WRContext dbContextb)
        {
            _dbContext = dbContextb;
        }

        [Authorize]
        [HttpGet]
        [Route("getNoteSettingsList")]
        public IActionResult GetNoteSettingsList()
        {
            return Ok(_dbContext.NoteSettings.Where(x => x.AccountId == WRContext.Account.Id));
        }

        [Authorize]
        [HttpGet]
        [Route("createSetting")]
        public IActionResult CreateSetting(string settingName)
        {
            var setting = _dbContext.NoteSettings.Where(x => x.SettingName == settingName && x.AccountId == WRContext.Account.Id).FirstOrDefault();
            
            if(setting != null)
                return StatusCode(404, "This setting already exist.");

            NoteSetting newSetting = new NoteSetting();
            newSetting.SettingName = settingName;

            _dbContext.NoteSettings.Add(newSetting);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
