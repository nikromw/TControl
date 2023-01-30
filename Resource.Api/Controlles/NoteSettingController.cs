using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReadModel.Models;
using System.Collections.Generic;
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
        [Route("getSettingsParamList")]
        public IActionResult GetSettingsParamList()
        {
            var result = _dbContext.SettingParams.Where(x => x.AccountId == WRContext.Account.Id).ToList();
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("getParamsByNoteId")]
        public IActionResult GetParamsByNoteId(int noteId)
        {
            var result = _dbContext.SettingParams.Where(x => x.AccountId == WRContext.Account.Id && x.NoteSettingId == noteId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("saveParamsForNote")]
        public IActionResult SaveNoteParams([FromBody]List<SettingParam> paramsSave, int noteId)
        {
           var settingParams = _dbContext.SettingParams.Where(x => x.NoteSettingId == noteId);

            settingParams.ToList().ForEach(x => x.IsSelected = false);

            for(int i = 0; i < paramsSave.Count; i++ )
            {
                var oldParam = settingParams.Where(x => x.Id == paramsSave[i].Id).FirstOrDefault();
                oldParam.IsSelected = paramsSave[i].IsSelected;
            }

            return Ok();
        }

        //[Authorize]
        //[HttpGet]
        //[Route("getNoteSettingsListByNoticeId")]
        //public IActionResult GetNoteSettingsList(int noticeID)
        //{
        //    return Ok(_dbContext.NoteSettings.Where(x => x.AccountId == WRContext.Account.Id && x.));
        //}

        [Authorize]
        [HttpGet]
        [Route("createSetting")]
        public IActionResult CreateSetting(string settingName)
        {
            var setting = _dbContext.NoteSettings.Where(x => x.SettingName == settingName && x.AccountId == WRContext.Account.Id).FirstOrDefault();

            if (setting != null)
                return StatusCode(404, "This setting already exist.");

            NoteSetting newSetting = new NoteSetting();
            newSetting.SettingName = settingName;
            newSetting.AccountId = WRContext.Account.Id;

            _dbContext.NoteSettings.Add(newSetting);
            _dbContext.SaveChanges();

            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("createSettingParam")]
        public IActionResult CreateSettingParam(string settingParamValue, int settingId)
        {
            var account = _dbContext.Accounts.Where(x => x.Id == WRContext.Account.Id).FirstOrDefault();

            if (account == null)
                return StatusCode(404, "Account do not exist.");

            _dbContext.SettingParams.Add(new SettingParam() { 
                AccountId = WRContext.Account.Id,
                NoteSettingId = settingId,
                Description = settingParamValue
            });

            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
