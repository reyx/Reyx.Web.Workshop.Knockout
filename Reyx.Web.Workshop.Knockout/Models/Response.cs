using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reyx.Web.Workshop.Knockout.Models
{
    public class Response
    {
        public Nullable<int> id { get; set; }
        public object data { get; set; }
        public List<string> errors { get; set; }
        public bool result { get; set; }
    }
}