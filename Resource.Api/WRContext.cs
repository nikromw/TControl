using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Resource.Api.Models;

namespace WriteModel
{
    public class WRContext : DbContext
    {
        public WRContext (DbContextOptions<WRContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

       public DbSet<LittleNote> LittleNotes { get; set; }
       public DbSet<Account> Accounts { get; set; }
    }
}
