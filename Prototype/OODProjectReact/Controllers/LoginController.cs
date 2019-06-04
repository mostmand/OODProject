using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OODProjectReact.ExtensionMethods;
using OODProjectReact.Models;

namespace OODProjectReact.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ood_projectContext db = new ood_projectContext();
        [HttpPost]
        public Guid? Login([FromBody] Dictionary<string, string> body)
        {
            var username = body["username"];
            var password = body["password"];
            var userQuery = db.User.Where(x => x.Username == username);
            if (userQuery.Any())
            {
                var user = userQuery.First();
                if (user.Password == password)
                {
                    var oldTokenQuery = db.LoginToken.Where(x => x.UserId == user.Id);
                    if (oldTokenQuery.Any())
                    {
                        db.Remove(oldTokenQuery.First());
                    }

                    var token = new LoginToken
                    {
                        AuthenticationToken = Guid.NewGuid(),
                        UserId = user.Id,
                        LastAccess = DateTime.Now
                    };

                    db.LoginToken.Add(token);
                    db.SaveChanges();

                    return token.AuthenticationToken;
                }
            }
            return null;
        }

        [HttpGet("is-logged-in")]
        public LoginState IsLoggedIn()
        {
            var user = this.Request.GetMyUser();
            if (user != null)
            {
                return new LoginState
                {
                    IsLoggedIn = true,
                    Username = user.Username
                };
            }
            return new LoginState
            {
                IsLoggedIn = false
            };
        }
    }
}