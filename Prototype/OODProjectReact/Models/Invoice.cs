using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceItem = new HashSet<InvoiceItem>();
            PurchaseInvoice = new HashSet<PurchaseInvoice>();
            SellInvoice = new HashSet<SellInvoice>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Fee { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItem { get; set; }
        public virtual ICollection<PurchaseInvoice> PurchaseInvoice { get; set; }
        public virtual ICollection<SellInvoice> SellInvoice { get; set; }
    }
}
