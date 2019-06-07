using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Category
    {
        public Category()
        {
            GoodCategory = new HashSet<GoodCategory>();
            InverseParentCategory = new HashSet<Category>();
        }

        public int Id { get; set; }
        public int? ParentCategoryId { get; set; }

        public virtual Category ParentCategory { get; set; }
        public virtual ICollection<GoodCategory> GoodCategory { get; set; }
        public virtual ICollection<Category> InverseParentCategory { get; set; }
    }
}
