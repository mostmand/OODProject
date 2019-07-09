using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Accounting
{
    interface IAccounting
    {
        int CreateSellInvoice(IInvoice sellInvoice);

        int CreatePurchaseInvoice(IInvoice purchaseInvoice);

        void CreateCustomerPayment(CustomerPayment payment);

        void CreateSupplierPayment(SupplierPayment payment);

        List<SellInvoice> GetSellInvoices(int from, int size);

        List<PurchaseInvoice> GetPurchaseInvoices(int from, int size);

        ISaleInvoiceDetails GetSaleInvoiceById(int Id);

        IPurchaseInvoiceDetails GetPurchaseInvoiceById(int Id);

        long GetCustomerTurnOver(int customerId);

        long GetCustomerTurnOverInPeriod(int customerId, DateTime start, DateTime end);

        void EditDiscountOnAllGoods(byte discountPercent);
    }

    public class IInvoice
    {
        public List<IInvoiceItem> Items { get; set; }
        public int TarafHesabId { get; set; }
    }

    public class IInvoiceItem
    {
        public int GoodId { get; set; }
        public int Quantity { get; set; }
    }

    public class IInvoiceSummary
    {
        public int Id { get; set; }
        public string CreatorUserName { get; set; }
        public string PersonName { get; set; }
        public string Date { get; set; }
        public int Fee { get; set; }
    }

    public class IInvoiceItemDetails
    {
        public string GoodName { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
    }

    public class IPurchaseInvoiceDetails
    {
        public string SupplierName { get; set; }
        public List<IInvoiceItemDetails> Items { get; set; }
        public int TotalPrice { get; set; }
        public int Remaining { get; set; }
        public List<SupplierPayment> Payments { get; set; }
    }

    public class ISaleInvoiceDetails
    {
        public string CustomerName { get; set; }
        public List<IInvoiceItemDetails> Items { get; set; }
        public int TotalPrice { get; set; }
        public int Remaining { get; set; }
        public List<CustomerPayment> Payments { get; set; }
    }

}
