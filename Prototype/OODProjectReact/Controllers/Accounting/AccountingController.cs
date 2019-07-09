using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OODProjectReact.Controllers.Inventory;
using OODProjectReact.ExtensionMethods;
using OODProjectReact.Filters;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers.Accounting
{
    [Route("api/[controller]")]
    public class AccountingController : ControllerBase, IAccounting
    {
        private readonly ood_projectContext db = new ood_projectContext();

        [CheckAuthentication]
        [HttpPost("create-sale-invoice")]
        public int CreateSellInvoice([FromBody]IInvoice sellInvoice)
        {
            var newInvoice = new SellInvoice();

            var user = this.Request.GetMyUser();
            newInvoice.Invoice = new Invoice();
            newInvoice.Invoice.User = user;

            // TODO Set invoice fee

            newInvoice.CustomerId = sellInvoice.TarafHesabId;

            foreach (var item in sellInvoice.Items)
            {
                var good = db.Good.First(x => x.Id == item.GoodId);
                if (item.Quantity > good.Quantity)
                {
                    throw new Exception("Not enough quantity in the inventory");
                }

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

        [CheckAuthentication]
        [HttpPost("create-purchase-invoice")]
        public int CreatePurchaseInvoice([FromBody]IInvoice purchaseInvoice)
        {
            var newInvoice = new PurchaseInvoice();

            var user = this.Request.GetMyUser();
            newInvoice.Invoice = new Invoice();
            newInvoice.Invoice.User = user;

            // TODO Set invoice fee

            newInvoice.SupplierId = purchaseInvoice.TarafHesabId;

            newInvoice.Invoice = new Invoice();
            foreach (var item in purchaseInvoice.Items)
            {
                var good = db.Good.First(x => x.Id == item.GoodId);


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

        [HttpGet("get-purchase-invoice")]
        public IPurchaseInvoiceDetails GetPurchaseInvoiceById([FromQuery]int Id)
        {
            var purchaseInvoice = db.PurchaseInvoice.First(x => x.InvoiceId == Id);

            var person = purchaseInvoice.Supplier.Person;

            var payments = purchaseInvoice.SupplierPayment.ToList();

            return new IPurchaseInvoiceDetails
            {
                SupplierName = person.Name + " " + person.LastName,
                Items = purchaseInvoice.Invoice.InvoiceItem.Select(x => new IInvoiceItemDetails
                {
                    GoodName = x.GoodName,
                    Quantity = x.Quantity,
                    TotalPrice = x.TotalPrice
                }).ToList(),
                TotalPrice = purchaseInvoice.Invoice.Fee,
                Payments = payments,
                Remaining = purchaseInvoice.Invoice.Fee - payments.Sum(x => x.Payment.Amount)
            };
        }

        [HttpGet("get-purchase-invoices")]
        public List<PurchaseInvoice> GetPurchaseInvoices([FromQuery]int from, [FromQuery]int size)
        {
            return db.PurchaseInvoice.Skip(from).Take(size).ToList();
        }

        [HttpGet("get-sale-invoice")]
        public ISaleInvoiceDetails GetSaleInvoiceById([FromQuery]int Id)
        {
            var sellInvoice = db.SellInvoice.First(x => x.InvoiceId == Id);

            var person = sellInvoice.Customer.Person;

            var payments = sellInvoice.CustomerPayment.ToList();

            return new ISaleInvoiceDetails
            {
                CustomerName = person.Name + " " + person.LastName,
                Items = sellInvoice.Invoice.InvoiceItem.Select(x => new IInvoiceItemDetails
                {
                    GoodName = x.GoodName,
                    Quantity = x.Quantity,
                    TotalPrice = x.TotalPrice
                }).ToList(),
                TotalPrice = sellInvoice.Invoice.Fee,
                Payments = payments,
                Remaining = sellInvoice.Invoice.Fee - payments.Sum(x => x.Payment.Amount)
            };
        }

        [HttpGet("get-sale-invoices")]
        public List<SellInvoice> GetSellInvoices([FromQuery]int from, [FromQuery]int size)
        {
            return db.SellInvoice.Skip(from).Take(size).ToList();
        }
    }
}
