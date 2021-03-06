﻿using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class CustomerPayment
    {
        public int PaymentId { get; set; }
        public int SellInvoiceId { get; set; }

        public virtual Payment Payment { get; set; }
        public virtual SellInvoice SellInvoice { get; set; }
    }
}
