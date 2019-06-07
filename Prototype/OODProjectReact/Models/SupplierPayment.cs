using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class SupplierPayment
    {
        public int PaymentId { get; set; }
        public int PurchaseInvoiceId { get; set; }

        public virtual Payment Payment { get; set; }
        public virtual PurchaseInvoice PurchaseInvoice { get; set; }
    }
}
