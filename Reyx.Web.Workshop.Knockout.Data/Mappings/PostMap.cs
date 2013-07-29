using Reyx.Web.Workshop.Knockout.Data.Entities;
using System.Data.Entity.ModelConfiguration;

namespace Reyx.Web.Workshop.Knockout.Data.Mappings
{
    public class PostMap : EntityTypeConfiguration<Post>
    {
        public PostMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.Posts)
                .HasForeignKey(t => t.UserId);
        }
    }
}
