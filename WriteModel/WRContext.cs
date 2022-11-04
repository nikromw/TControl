using Auth.Api.Models;
using Resource.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Text;

namespace WriteModel
{
    public class WRContext : DbContext
    {
        public WRContext () : base("DbConnection")
        { }

       public DbSet<LittleNote> LittleNotes { get; set; }
       public DbSet<Account> Accounts { get; set; }
        //qwe

    }
}
