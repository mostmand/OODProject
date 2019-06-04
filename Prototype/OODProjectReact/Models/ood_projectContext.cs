using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OODProjectReact.Models
{
    public partial class ood_projectContext : DbContext
    {
        public ood_projectContext()
        {
        }

        public ood_projectContext(DbContextOptions<ood_projectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LoginToken> LoginToken { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=ood_project;User ID=sa;Password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<LoginToken>(entity =>
            {
                entity.HasKey(e => e.AuthenticationToken)
                    .HasName("PK__LoginTok__97D020CBDFA4A91E");

                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__LoginTok__1788CC4D8B301F77")
                    .IsUnique();

                entity.Property(e => e.AuthenticationToken).ValueGeneratedNever();

                entity.Property(e => e.LastAccess)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.LoginToken)
                    .HasForeignKey<LoginToken>(d => d.UserId)
                    .HasConstraintName("FK_UserId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username)
                    .HasName("UQ__User__536C85E49BEBAA52")
                    .IsUnique();

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);
            });
        }
    }
}
