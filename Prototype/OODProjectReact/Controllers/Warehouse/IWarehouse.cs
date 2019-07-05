using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Controllers.Warehouse
{
    interface IWarehouse
    {
        void AddKala(Good good);

        List<Good> GetGoodsByKeyword(string keyword);

        List<Good> GetAllGoods();

        Good GetGoodByID(long id);
    }
}
