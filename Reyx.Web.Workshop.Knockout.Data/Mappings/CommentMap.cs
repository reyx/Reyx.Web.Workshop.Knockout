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
    public class CommentMap : EntityTypeConfiguration<Comment>
    {
        public CommentMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Content)
                .HasMaxLength(255);

            // Relationships
            this.HasRequired(t => t.Post)
                .WithMany(t => t.Comments)
                .HasForeignKey(t => t.PostId);

            this.HasOptional(t => t.User)
                .WithMany(t => t.Comments)
                .HasForeignKey(t => t.UserId);
        }
    }
}
