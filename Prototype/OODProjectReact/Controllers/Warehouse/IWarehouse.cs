using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Warehouse
{
    interface IWarehouse
    {
        void AddGood(IGood good);

        void EditGood(IGood good);

        void DeleteGood(int goodId);

        List<Good> GetGoodsByKeyword(string keyword);

        List<Good> GetAllGoods(int from, int size);

        Good GetGoodByID(int id);
    }

    public class IGood
    {
        public int Id { get; set; }
        public string Sku { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public string Explanation { get; set; }

        public List<int> CategoryIds { get; set; }

    }
}
