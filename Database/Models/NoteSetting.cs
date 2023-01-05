using System;
using System.Collections.Generic;

namespace ReadModel.Models
{
    public class NoteSetting
    {
        public int Id { get; set; }
        public string SettingName { get; set; }
        public IEnumerable<SettingParam> SettingParams { get; set; }
        public Guid AccountId { get; set; }
    }
}
