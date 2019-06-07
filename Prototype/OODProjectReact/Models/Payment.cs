using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Payment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Amount { get; set; }

        public virtual CustomerPayment CustomerPayment { get; set; }
        public virtual SupplierPayment SupplierPayment { get; set; }
    }
}
