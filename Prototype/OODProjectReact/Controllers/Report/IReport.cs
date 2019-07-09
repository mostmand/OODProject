using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Report
{
    interface IReportGenerator
    {
        Report<GoodQuantityReportItem> GetGoodQuantityReport(DateTime start, DateTime end);

        Report<CustomerInvoicesReportItem> GetCustomerInvoiceReport(DateTime start, DateTime end);
    }

    public class Report<T> where T : IReportItem
    {
        public Report(DateTime startDate, DateTime endDate, DateTime generateDate)
        {
            StartDate = startDate;
            EndDate = endDate;
            GenerateDate = generateDate;
        }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public DateTime GenerateDate { get; set; }

        public List<T> ReportItems { get; set; } = new List<T>();
    }

    public interface IReportItem
    {

    }

    public class GoodQuantityReportItem : IReportItem
    {
        public string GoodName { get; set; }

        public int QuantityAtStartOfPeriod { get; set; }

        public int QuantityAtEndOfPeriod { get; set; }

        public int QuantitySold { get; set; }
    }

    public class CustomerInvoicesReportItem : IReportItem
    {
        public string CustomerName { get; set; }

        public int InvoicesCount { get; set; }

        public long TotalPriceOfInvoices { get; set; }
    }

}
