using Auth.Api.Models;
using Microsoft.EntityFrameworkCore;
using ReadModel.Models;
using Resource.Api.Models;

namespace WriteModel
{
    public class WRContext : DbContext
    {
        private static Account _account;

        public static Account Account { get; set; }

        public static void SetCurrentUser(Account account)
        {
            Account = account;
        }

        public WRContext(DbContextOptions<WRContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<LittleNote> LittleNotes { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<NoteSetting> NoteSettings { get; set; }
    }
}
