using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OODProto.Startup))]
namespace OODProto
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
