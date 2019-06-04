using Microsoft.AspNetCore.Mvc.Filters;
using OODProjectReact.Const;
using OODProjectReact.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OODProjectReact.Filters
{
    public class CheckAuthentication : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.Request.GetMyUser();
            if (user == null)
            {
                throw new UnauthorizedAccessException("You are not allowed to access this api");
            }
        }
    }
}
