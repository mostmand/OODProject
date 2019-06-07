using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class SellInvoice
    {
        public SellInvoice()
        {
            CustomerPayment = new HashSet<CustomerPayment>();
        }

        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Invoice Invoice { get; set; }
        public virtual ICollection<CustomerPayment> CustomerPayment { get; set; }
    }
}
