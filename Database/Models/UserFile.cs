using System;
using System.Collections.Generic;
using System.Text;

namespace ReadModel.Models
{
    public class UserFile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] Content { get; set; }
    }
}
