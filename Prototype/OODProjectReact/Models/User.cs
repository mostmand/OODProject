using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual LoginToken LoginToken { get; set; }
    }
}
