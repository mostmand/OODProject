using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class LoginToken
    {
        public Guid AuthenticationToken { get; set; }
        public int UserId { get; set; }
        public DateTime LastAccess { get; set; }

        public virtual User User { get; set; }
    }
}
