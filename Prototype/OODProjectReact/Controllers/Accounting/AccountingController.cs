using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers.Accounting
{
    public class AccountingController : IAccounting
    {
        private readonly ood_projectContext db = new ood_projectContext();

        public long CreateSellInvoice(SellInvoice sellInvoice)
        {
            db.SellInvoice.Add(sellInvoice);
            db.SaveChanges();

            return sellInvoice.InvoiceId;
        }

        public long CreatePurchaseInvoice(PurchaseInvoice purchaseInvoice)
        {
            db.PurchaseInvoice.Add(purchaseInvoice);
            db.SaveChanges();

            return purchaseInvoice.InvoiceId;
        }

        public void CreateCustomerPayment(CustomerPayment payment)
        {
            db.CustomerPayment.Add(payment);
            db.SaveChanges();
        }

        public void CreateSupplierPayment(SupplierPayment payment)
        {
            db.SupplierPayment.Add(payment);
            db.SaveChanges();
        }

        public void EditDiscountOnAllGoods(byte discountPercent)
        {
            throw new NotImplementedException();
        }

        public long GetCustomerTurnOver(int customerId)
        {
            throw new NotImplementedException();
        }

        public long GetCustomerTurnOverInPeriod(int customerId, DateTime start, DateTime end)
        {
            throw new NotImplementedException();
        }

        public PurchaseInvoice GetPurchaseInvoiceById(int Id)
        {
            return db.PurchaseInvoice.First(x => x.InvoiceId == Id);
        }

        public List<PurchaseInvoice> GetPurchaseInvoices(int from, int size)
        {
            return db.PurchaseInvoice.Skip(from).Take(size).ToList();
        }

        public SellInvoice GetSellInvoiceById(int Id)
        {
            return db.SellInvoice.First(x => x.InvoiceId == Id);
        }

        public List<SellInvoice> GetSellInvoices(int from, int size)
        {
            return db.SellInvoice.Skip(from).Take(size).ToList();
        }
    }
}
