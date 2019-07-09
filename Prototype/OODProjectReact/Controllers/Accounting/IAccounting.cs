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

        SellInvoice GetSellInvoiceById(int Id);

        PurchaseInvoice GetPurchaseInvoiceById(int Id);

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
}
