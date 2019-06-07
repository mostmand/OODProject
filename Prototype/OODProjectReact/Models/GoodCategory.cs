using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class GoodCategory
    {
        public int GoodId { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Good Good { get; set; }
    }
}
