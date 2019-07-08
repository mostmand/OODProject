using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Good
    {
        public Good()
        {
            GoodCategory = new HashSet<GoodCategory>();
            InvoiceItem = new HashSet<InvoiceItem>();
        }

        public int Id { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public string Explanation { get; set; }

        public virtual ICollection<GoodCategory> GoodCategory { get; set; }
        public virtual ICollection<InvoiceItem> InvoiceItem { get; set; }
    }
}
