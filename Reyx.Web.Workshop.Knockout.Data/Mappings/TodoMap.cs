using Reyx.Web.Workshop.Knockout.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reyx.Web.Workshop.Knockout.Data.Mappings
{
    public class TodoMap : EntityTypeConfiguration<Todo>
    {
        public TodoMap()
        {
            this.HasKey(t => t.Id);

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.Todoes)
                .HasForeignKey(t => t.UserId);
        }
    }
}
