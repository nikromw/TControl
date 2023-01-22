using Resource.Api.Models;
using System;
using System.Collections.Generic;

namespace ReadModel.Models
{
    public class NoteSetting
    {
        public int Id { get; set; }
        public string SettingName { get; set; }
        public Guid AccountId { get; set; }
    }
}
