using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Report
{
    public class ReportController : IReportGenerator
    {
        private readonly ood_projectContext db = new ood_projectContext();

        public Report<CustomerInvoicesReportItem> GetCustomerInvoiceReport(DateTime start, DateTime end)
        {
            var result = new Report<CustomerInvoicesReportItem>(start, end, DateTime.Now);
            var accountingService = new Accounting.AccountingController();

            foreach(var customer in db.Customer)
            {
                var item = accountingService.GetCustomerTurnOverInPeriod(customer.PersonId, start, end);

                if (item.invoiceCount != 0)
                {
                    result.ReportItems.Add(new CustomerInvoicesReportItem()
                    {
                        CustomerName = customer.Person?.Name + " " + customer.Person?.LastName,
                        InvoicesCount = item.invoiceCount,
                        TotalPriceOfInvoices = item.money
                    });
                }
            }

            return result;
        }

        public Report<GoodQuantityReportItem> GetGoodQuantityReport(DateTime start, DateTime end)
        {
            var result = new Report<CustomerInvoicesReportItem>(start, end, DateTime.Now);

            throw new NotImplementedException();
        }
    }
}
