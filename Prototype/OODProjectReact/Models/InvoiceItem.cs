using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class InvoiceItem
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int GoodId { get; set; }
        public string GoodName { get; set; }
        public int GoodPrice { get; set; }
        public int Quantity { get; set; }
        public int? Discount { get; set; }
        public int TotalPrice { get; set; }

        public virtual Good Good { get; set; }
        public virtual Invoice Invoice { get; set; }
    }
}
