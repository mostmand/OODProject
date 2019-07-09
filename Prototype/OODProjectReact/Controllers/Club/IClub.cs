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

        List<ICustomer> GetCustomersByKeyword(string keyword);

        List<ISupplier> GetSuppliersByKeyword(string keyword);

        byte GetCustomerLevelDiscountById(int customerId);

        /// <summary>
        /// افزایش یا کاهش تراز مالی مشتری
        /// </summary>
        /// <param name="customerId">آی دی مشتری</param>
        /// <param name="amount">مقدار مثبت برای افزایش بستانکاری و بر عکس</param>
        void IncreaseCustomerBalance(int customerId, int amount);

        /// <summary>
        /// افزایش یا کاهش تراز مالی تامین کننده
        /// </summary>
        /// <param name="supplierId">آی دی تامین کننده</param>
        /// <param name="amount">مقدار مثبت برای افزایش بستانکاری و بر عکس</param>
        void IncreaseSupplierBalance(int supplierId, int amount);

        // جزء حذفیات پیاده سازی است
        void RegisterCustomer(Person person);

        // جزء حذفیات پیاده سازی است
        void RegisterSupplier(Supplier customer);
    }

    public class ISupplier {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class ICustomer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class ClubRuleset
    {
        // مشتری به ازای هر خرید بالاتر از فلان قیمت، بهمان مقدار امتیاز می‌گیرد
        public List<PriceRule> PriceRules { get; set; }

        // مشتری به ازای چه مقدار امتیاز چه سطحی دارد
        public List<LevelRule> LevelRules { get; set; }

        public List<DiscountRule> DiscountRules { get; set; }
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

    public class DiscountRule
    {
        public CustomerLevel Level { get; set; }

        public byte DiscountPercent { get; set; }
    }

    public enum CustomerLevel
    {
        Bronze,
        Silver,
        Gold
    }
}
