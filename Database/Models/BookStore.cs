using System;
using System.Collections.Generic;

namespace Resource.Api.Models
{
    public class BookStore
    {
        public List<Book> Books => new List<Book>
        {
            new Book(){ Id =1 , Author = "Author", Title = "Title_test", Price = 8.51M}
        };

        public Dictionary<Guid, int[]> Orders => new Dictionary<Guid, int[]>
        {
            {Guid.Parse("600AE514-90BE-4F18-890E-45EBD429E2BF"), new int[] { 1,2,3} }
        };

    }
}
