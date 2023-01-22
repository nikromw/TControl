

using System;
using System.Collections.Generic;

namespace ReadModel.Models
{
    public class SettingParam
    {
        public int Id { get; set; }
        public int NoteSettingId { get; set; }
        public string Description { get; set; }
        public Guid AccountId { get; set; }
        public IEnumerable<NoteSetting> NoteSettings { get; set; }
    }
}
