using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using Resource.Api.Models;

namespace WriteModel
{
    public class WRContext : DbContext
    {
        private static Account _account;

        public static Account Account
        {
            get
            {
                return _account;
            }
            set
            {
                if (_account == null)
                    _account = value;

            }
        }

        public WRContext(DbContextOptions<WRContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<LittleNote> LittleNotes { get; set; }
        public DbSet<Account> Accounts { get; set; }
    }
}
