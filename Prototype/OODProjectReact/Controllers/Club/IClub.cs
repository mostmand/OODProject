using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Club
{
    interface IClub
    {
        ClubRuleset GetClubRules();

        void ChangeClubRules(ClubRuleset rules);

        List<Customer> GetCustomersByKeyword(string keyword);

        List<Supplier> GetSuppliersByKeyword(string keyword);

        // جزء حزفیات پیاده سازی است
        void RegisterCustomer(Person person);

        // جزء حزفیات پیاده سازی است
        void RegisterSupplier(Supplier customer);
    }

    public class ClubRuleset
    {
        // مشتری به ازای هر خرید بالاتر از فلان قیمت، بهمان مقدار امتیاز می‌گیرد
        public List<PriceRule> PriceRules { get; set; }

        // مشتری به ازای چه مقدار امتیاز چه سطحی دارد
        public List<LevelRule> LevelRules { get; set; }
    }

    public class PriceRule
    {
        public long RequiredTotalPrice { get; set; }

        public int Score { get; set; }
    }

    public class LevelRule
    {
        public int RequiredScore { get; set; }

        public CustomerLevel Level { get; set; }
    }

    public enum CustomerLevel
    {
        Bronze,
        Silver,
        Gold
    }
}
