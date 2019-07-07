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

        long GetCustomerTurnOver(int customerId);

        void SetDiscountOnAllGoods(double discountPercent);
    }
}
