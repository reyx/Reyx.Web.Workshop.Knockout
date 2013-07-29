using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reyx.Web.Workshop.Knockout.Models
{
    public static class ExtensionMethods
    {
        public static List<string> GetAllErrMessages(this Exception ex)
        {
            List<string> messages = new List<string>();

            for (Exception eCurrent = ex; eCurrent != null; eCurrent = eCurrent.InnerException)
            {
                messages.Add(eCurrent.Message);
            }

            return messages;
        }
    }
}