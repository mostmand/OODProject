using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class PeriodDiscount
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Discount { get; set; }
        public int? MinAmount { get; set; }
        public int? MaxAmount { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
