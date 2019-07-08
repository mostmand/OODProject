using Microsoft.AspNetCore.Mvc;
using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Inventory
{
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase, IInventory
    {
        private readonly ood_projectContext db = new ood_projectContext();

        [HttpPost("add-good")]
        public void AddGood([FromBody]IGood good)
        {
            if (good.Id != 0)
            {
                throw new FormatException("Invalid request id is set");
            }

            var newGood = new Good
            {
                Name = good.Name,
                Sku = good.Sku,
                Quantity = good.Quantity,
                Explanation = good.Explanation,
                Discount = good.Discount,
                Price = good.Price
            };

            //var categoryIds = good.CategoryIds.ToHashSet();
            //db.GoodCategory.AddRange(categoryIds.Select(categoryId => new GoodCategory { Good = newGood, CategoryId = categoryId }));

            db.Good.Add(newGood);
            db.SaveChanges();
        }

        [HttpPost("delete-good")]
        public void DeleteGood([FromQuery]int goodId)
        {
            var goodQuery = db.Good.Where(x => x.Id == goodId);

            if (goodQuery.Any())
            {
                db.Good.Remove(goodQuery.First());
                db.SaveChanges();
            }
        }

        [HttpPost("edit-good")]
        public void EditGood([FromBody]IGood good)
        {
            var savedGoodQuery = db.Good.Where(x => x.Id == good.Id);

            if (savedGoodQuery.Any())
            {
                var savedGood = savedGoodQuery.First();

                savedGood.Name = good.Name;
                savedGood.Price = good.Price;
                savedGood.Discount = good.Discount;
                savedGood.Explanation = good.Explanation;
                savedGood.Quantity = good.Quantity;

                //var categoryIds = good.CategoryIds.ToHashSet();
                //savedGood.GoodCategory = categoryIds.Select(categoryId => new GoodCategory { Good = newGood, CategoryId = categoryId }).ToList();

                db.SaveChanges();
            }
        }

        [HttpPost("get-all-goods")]
        public List<IGood> GetAllGoods([FromQuery]int from, [FromQuery]int size, [FromQuery]string keyword, [FromBody]List<int> categoryIds)
        {
            var result = db.Good.AsQueryable();
            result = result.Skip(from).Take(size);

            return result.Select(x => ToIGood(x)).ToList();
        }

        [HttpGet("get-good")]
        public IGood GetGoodByID([FromQuery]int id)
        {
            var goodQuery = db.Good.Where(x => x.Id == id);
            if (goodQuery.Any())
            {
                var good = goodQuery.First();

                var igood = ToIGood(good);

                return igood;
            }
            throw new Exception("Good not found");
        }

        public void IncreaseGoodQuantity(int goodId, int amount)
        {
            var goodQuery = db.Good.Where(x => x.Id == goodId);

            if (goodQuery.Any())
            {
                var good = goodQuery.First();

                var newQuantity = good.Quantity + amount;
                if (newQuantity > 0)
                {
                    good.Quantity = newQuantity;
                }
                else
                {
                    throw new Exception("Not enough quantity is available in the inventory");
                }
            }
        }

        private IGood ToIGood(Good good)
        {
            return new IGood
            {
                Id = good.Id,
                Name = good.Name,
                CategoryIds = good.GoodCategory.Select(x => x.CategoryId).ToList(),
                Discount = good.Discount,
                Explanation = good.Explanation,
                Price = good.Price,
                Quantity = good.Quantity,
                Sku = good.Sku
            };
        }
    }
}
