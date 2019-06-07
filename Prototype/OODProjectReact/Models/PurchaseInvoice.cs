using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class PurchaseInvoice
    {
        public PurchaseInvoice()
        {
            SupplierPayment = new HashSet<SupplierPayment>();
        }

        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int SupplierId { get; set; }

        public virtual Invoice Invoice { get; set; }
        public virtual Supplier Supplier { get; set; }
        public virtual ICollection<SupplierPayment> SupplierPayment { get; set; }
    }
}
