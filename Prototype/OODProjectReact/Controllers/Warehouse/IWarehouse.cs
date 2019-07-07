using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Warehouse
{
    interface IWarehouse
    {
        void AddGood(Good good);

        void EditGood(Good good);

        void DeletGood(int goodId);

        List<Good> GetGoodsByKeyword(string keyword);

        List<Good> GetAllGoods(int from, int size);

        Good GetGoodByID(int id);
    }
}
