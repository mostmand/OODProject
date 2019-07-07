using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Club
{
    interface IClub
    {
        // push test
        List<Customer> GetCustomersByKeyword(string keyword);

        List<Supplier> GetSuppliersByKeyword(string keyword);

        void RegisterCustomer(Person person);

        void RegisterSupplier(Supplier customer);
    }

    //interface IRegisterRequest
    //{
    //    Person Person { get; set; }
    //}

    //interface IRegisterSupplierRequest : IRegisterRequest
    //{
    //    string Address { get; set; }
    //}
}
