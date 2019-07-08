using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Inventory
{
    interface IInventory
    {
        void AddGood(IGood good);

        void EditGood(IGood good);

        void DeleteGood(int goodId);

        List<IGood> GetAllGoods(int from, int size, string keyword, List<int> categoryIds);

        IGood GetGoodByID(int id);

        /// <summary>
        /// در زمان خرید یا فروش تعداد کالا را بیشتر یا کمتر می‌کند
        /// </summary>
        /// <param name="goodId">آی دی کالایی که تعداد آن تغییر کرده</param>
        /// <param name="amount">میزان افزایش یا کاهش جنس که برای افزایش مثبت است و بر عکس</param>
        void IncreaseGoodQuantity(int goodId, int amount);
    }

    public class IGood
    {
        public int Id { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public byte Discount { get; set; }
        public string Explanation { get; set; }

        public List<int> CategoryIds { get; set; }

    }
}
