using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers.Club
{
    [Route("api/[controller]")]
    public class ClubController : ControllerBase, IClub
    {
        private readonly ood_projectContext db = new ood_projectContext();

        public void ChangeClubRules(ClubRuleset rules)
        {
            // TODO تکمیل شود
            throw new NotImplementedException();
        }

        public ClubRuleset GetClubRules()
        {
            throw new NotImplementedException();
        }

        public byte GetCustomerLevelDiscountById(int customerId)
        {
            throw new NotImplementedException();
        }

        [HttpGet("get-customer")]
        public List<ICustomer> GetCustomersByKeyword([FromQuery]string keyword)
        {
            return db.Customer.Where(x => x.Person.Name.Contains(keyword) || x.Person.LastName.Contains(keyword))
                .Select(x => new ICustomer
                {
                    Id = x.Id,
                    Name = x.Person.Name + " " +  x.Person.LastName,
                    PhoneNumber = x.Person.MobileNumber
                }).ToList();
        }

        [HttpGet("get-supplier")]
        public List<ISupplier> GetSuppliersByKeyword([FromBody]string keyword)
        {
            return db.Supplier.Where(x => x.Person.Name.Contains(keyword) || x.Person.LastName.Contains(keyword))
                .Select(x => new ISupplier
                {
                    Id = x.Id,
                    Name = x.Person.Name + " " + x.Person.LastName,
                    PhoneNumber = x.Person.MobileNumber
                }).ToList();
        }

        public void IncreaseCustomerBalance(int customerId, int amount)
        {
            var currentCustomer = db.Customer.First(x => x.Id == customerId);
            currentCustomer.Person.Balance += amount;

            db.SaveChanges();
        }

        public void IncreaseSupplierBalance(int supplierId, int amount)
        {
            var currentSupplier = db.Supplier.First(x => x.Id == supplierId);
            currentSupplier.Person.Balance += amount;

            db.SaveChanges();
        }

        public void RegisterCustomer(Person person)
        {
            throw new NotImplementedException();
        }

        public void RegisterSupplier(Supplier customer)
        {
            throw new NotImplementedException();
        }
    }
}
