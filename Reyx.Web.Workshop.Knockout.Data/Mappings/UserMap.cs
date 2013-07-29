using Reyx.Web.Workshop.Knockout.Data.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Reyx.Web.Workshop.Knockout.Data.Mappings
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            this.HasKey(t => t.Id);
        }
    }
}
