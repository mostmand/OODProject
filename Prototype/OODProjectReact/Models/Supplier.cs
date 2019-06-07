using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            PurchaseInvoice = new HashSet<PurchaseInvoice>();
        }

        public int Id { get; set; }
        public string Address { get; set; }
        public int Balance { get; set; }
        public int TotalSellFee { get; set; }
        public int PersonId { get; set; }

        public virtual Person Person { get; set; }
        public virtual ICollection<PurchaseInvoice> PurchaseInvoice { get; set; }
    }
}
