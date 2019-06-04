using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using OODProjectReact.Const;
using OODProjectReact.Models;
using System;

public class UserInitializer
{
    private readonly ood_projectContext db = new ood_projectContext();

    public void Initilize(HttpContext context)
    {
        var stringToken = context.Request.Cookies["logintoken"];

        if (Guid.TryParse(stringToken, out var guidToken))
        {
            var token = db.LoginToken.Find(guidToken);
            if (token != null)
            {
                context.Request.Headers.Add(ConstString.MyUserHeader, token.UserId.ToString());
                token.LastAccess = DateTime.Now;
                db.SaveChanges();

                return;
            }
        }
        context.Request.Headers.Remove(ConstString.MyUserHeader);
    }
}