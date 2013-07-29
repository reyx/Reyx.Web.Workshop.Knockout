using System.Web;
using System.Web.Mvc;

namespace Reyx.Web.Workshop.Knockout
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}