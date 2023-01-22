using ReadModel.Models;
using Resource.Api.Models;
using System;
using System.Collections.Generic;

namespace Auth.Api.Models
{
    public class Account 
    {
        public Guid Id { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public string Photo { get; set; }
        public string Name { get; set; }
        public Role Roles { get; set; }
        public IEnumerable<LittleNote> LittleNotes { get; set; }
        public IEnumerable<NoteSetting> NoteSettings { get; set; }
        public IEnumerable<SettingParam> SettingParams { get; set; }
    }

    public enum Role
    {
        User,
        Admin
    }
}
