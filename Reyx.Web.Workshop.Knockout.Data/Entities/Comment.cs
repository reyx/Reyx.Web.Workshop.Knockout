using Reyx.Web.Workshop.Knockout.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reyx.Web.Workshop.Knockout.Data.Entities
{
    public class Comment : IEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Nullable<int> UserId { get; set; }
        public virtual User User { get; set; }
    }
}
