using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OODProjectReact.Controllers.Inventory;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers.Accounting
{
    [Route("api/[controller]")]
    public class AccountingController : ControllerBase, IAccounting
    {
        private readonly ood_projectContext db = new ood_projectContext();

        public int CreateSellInvoice(IInvoice sellInvoice)
        {
            var newInvoice = new SellInvoice();

            newInvoice.CustomerId = sellInvoice.TarafHesabId;

            foreach (var item in sellInvoice.Items)
            {
                var good = db.Good.First(x => x.Id == item.GoodId);
                if (item.Quantity > good.Quantity)
                {
                    throw new Exception("Not enough quantity in the inventory");
                }

                newInvoice.Invoice = new Invoice();

                newInvoice.Invoice.InvoiceItem.Add(new InvoiceItem
                {
                    GoodId = item.GoodId,
                    GoodName = good.Name,
                    Discount = good.Discount,
                    GoodPrice = good.Price,
                    Quantity = good.Quantity,
                });
            }

            db.SellInvoice.Add(newInvoice);
            db.SaveChanges();

            IInventory inventory = new InventoryController();
            foreach (var item in sellInvoice.Items)
            {
                inventory.IncreaseGoodQuantity(item.GoodId, -item.Quantity);
            }
            return newInvoice.InvoiceId;
        }

        public int CreatePurchaseInvoice(IInvoice purchaseInvoice)
        {
            var newInvoice = new PurchaseInvoice();

            newInvoice.SupplierId = purchaseInvoice.TarafHesabId;

            foreach (var item in purchaseInvoice.Items)
            {
                var good = db.Good.First(x => x.Id == item.GoodId);

                newInvoice.Invoice = new Invoice();

                newInvoice.Invoice.InvoiceItem.Add(new InvoiceItem
                {
                    GoodId = item.GoodId,
                    GoodName = good.Name,
                    Discount = good.Discount,
                    GoodPrice = good.Price,
                    Quantity = good.Quantity,
                });
            }

            db.PurchaseInvoice.Add(newInvoice);
            db.SaveChanges();

            IInventory inventory = new InventoryController();
            foreach (var item in purchaseInvoice.Items)
            {
                inventory.IncreaseGoodQuantity(item.GoodId, item.Quantity);
            }

            return newInvoice.InvoiceId;
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
