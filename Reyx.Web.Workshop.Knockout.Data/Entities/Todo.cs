using Reyx.Web.Workshop.Knockout.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reyx.Web.Workshop.Knockout.Data.Entities
{
    public class Todo : IEntity
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public bool Done { get; set; }
        public bool Visible { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}