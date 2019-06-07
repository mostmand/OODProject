using System;
using System.Collections.Generic;

namespace OODProjectReact.Models
{
    public partial class Person
    {
        public Person()
        {
            Customer = new HashSet<Customer>();
            Supplier = new HashSet<Supplier>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsLegalPerson { get; set; }
        public int Balance { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Supplier> Supplier { get; set; }
    }
}
