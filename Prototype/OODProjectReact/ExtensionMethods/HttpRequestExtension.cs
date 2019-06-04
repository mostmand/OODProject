using Microsoft.AspNetCore.Http;
using OODProjectReact.Const;
using OODProjectReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.ExtensionMethods
{
    public static class HttpRequestExtension
    {
        private static readonly ood_projectContext db = new ood_projectContext();
        public static User GetMyUser(this HttpRequest request)
        {
            if (request.Headers.TryGetValue(ConstString.MyUserHeader, out var userId))
            {
                return db.User.Find(Convert.ToInt32(userId));
            }
            return null;
        }
    }
}
