﻿using Resource.Api.Models;
using System;
using System.Collections.Generic;

namespace Auth.Api.Models
{
    public class Account : IdentityUser
    {
        public Guid Id { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public Role Roles { get; set; }
        public IEnumerable<LittleNote> LittleNotes { get; set; }
    }

    public enum Role
    {
        User,
        Admin
    }
}
