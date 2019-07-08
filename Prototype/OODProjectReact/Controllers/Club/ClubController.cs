﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers.Club
{
    public class ClubController : IClub
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

        public List<Customer> GetCustomersByKeyword(string keyword)
        {
            return db.Customer.Where(x => x.Person.Name.Contains(keyword) || x.Person.LastName.Contains(keyword)).ToList();
        }

        public List<Supplier> GetSuppliersByKeyword(string keyword)
        {
            return db.Supplier.Where(x => x.Person.Name.Contains(keyword) || x.Person.LastName.Contains(keyword)).ToList();
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
    }
}
