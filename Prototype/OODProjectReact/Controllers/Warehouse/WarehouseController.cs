using Microsoft.AspNetCore.Mvc;
using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Warehouse
{
    [Route("api/[controller]")]
    public class WarehouseController : ControllerBase, IWarehouse
    {
        private readonly ood_projectContext db = new ood_projectContext();

        [HttpPost("add-good")]
        public void AddGood([FromBody]IGood good)
        {
            if (good.Id != 0)
            {
                throw new FormatException("Invalid request id is set");
            }

            var categoryIds = good.CategoryIds.ToHashSet();

            var newGood = new Good
            {
                Name = good.Name,
                Sku = good.Sku,
                Quantity = good.Quantity,
                Explanation = good.Explanation,
                Discount = good.Discount,
                Price = good.Price
            };

            newGood.GoodCategory.Union(db.GoodCategory.Where(x => categoryIds.Contains(x.CategoryId)));

            db.Good.Add(newGood);
            db.SaveChanges();
        }

        public void DeleteGood(int goodId)
        {
            throw new NotImplementedException();
        }

        public void EditGood(IGood good)
        {
            throw new NotImplementedException();
        }

        public List<Good> GetAllGoods(int from, int size)
        {
            throw new NotImplementedException();
        }

        public Good GetGoodByID(int id)
        {
            throw new NotImplementedException();
        }

        public List<Good> GetGoodsByKeyword(string keyword)
        {
            throw new NotImplementedException();
        }
    }
}
