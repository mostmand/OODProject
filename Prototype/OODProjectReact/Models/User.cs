using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class User
    {
        public User()
        {
            Invoice = new HashSet<Invoice>();
            PeriodDiscount = new HashSet<PeriodDiscount>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string NationalIdcode { get; set; }
        public bool IsAdmin { get; set; }
        public int? PersonId { get; set; }

        public virtual Person Person { get; set; }
        public virtual LoginToken LoginToken { get; set; }
        public virtual ICollection<Invoice> Invoice { get; set; }
        public virtual ICollection<PeriodDiscount> PeriodDiscount { get; set; }
    }
}
