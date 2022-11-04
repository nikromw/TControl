using System;

namespace Resource.Api.Models
{
    public class LittleNote
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Attachments { get; set; }
        public string Background { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime Deleted { get; set; }
        public Guid AccountId { get; set; }
    }
}
