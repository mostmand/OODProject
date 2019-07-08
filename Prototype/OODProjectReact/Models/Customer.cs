using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Customer
    {
        public Customer()
        {
            SellInvoice = new HashSet<SellInvoice>();
        }

        public int Id { get; set; }
        public int CustomerRate { get; set; }

        // Duplicate property
        //public int Balance { get; set; }
        public int TotalPurchaseFee { get; set; }
        public int PersonId { get; set; }

        public virtual Person Person { get; set; }
        public virtual ICollection<SellInvoice> SellInvoice { get; set; }
    }
}
