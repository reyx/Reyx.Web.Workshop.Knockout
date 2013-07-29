using Reyx.Web.Workshop.Knockout.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reyx.Web.Workshop.Knockout
{
    public class Settings
    {
        private const string SETTINGS_USER = "Settings.User";

        public static User User
        {
            get
            {
                return (User)System.Web.HttpContext.Current.Session[SETTINGS_USER];
            }
            set
            {
                System.Web.HttpContext.Current.Session[SETTINGS_USER] = value;
            }
        }
    }
}