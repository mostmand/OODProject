using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Accounting
{
    interface IAccounting
    {
        long CreateSellInvoice(SellInvoice sellInvoice);

        long CreatePurchaseInvoice(PurchaseInvoice purchaseInvoice);

        void CreateCustomerPayment(CustomerPayment payment);

        void CreateSupplierPayment(SupplierPayment payment);

        List<SellInvoice> GetSellInvoices(int from, int size);

        List<PurchaseInvoice> GetPurchaseInvoices(int from, int size);

        SellInvoice GetSellInvoiceById(int Id);

        PurchaseInvoice GetPurchaseInvoiceById(int Id);

        long GetCustomerTurnOver(int customerId);

        void EditDiscountOnAllGoods(double discountPercent);
    }
}
