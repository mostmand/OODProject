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

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerPayment> CustomerPayment { get; set; }
        public virtual DbSet<Good> Good { get; set; }
        public virtual DbSet<GoodCategory> GoodCategory { get; set; }
        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<InvoiceItem> InvoiceItem { get; set; }
        public virtual DbSet<LoginToken> LoginToken { get; set; }
        public virtual DbSet<Payment> Payment { get; set; }
        public virtual DbSet<PeriodDiscount> PeriodDiscount { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PurchaseInvoice> PurchaseInvoice { get; set; }
        public virtual DbSet<SellInvoice> SellInvoice { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<SupplierPayment> SupplierPayment { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=ood_project;User ID=ood_project;Password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasOne(d => d.ParentCategory)
                    .WithMany(p => p.InverseParentCategory)
                    .HasForeignKey(d => d.ParentCategoryId)
                    .HasConstraintName("FK_Category_ParentCategoryId");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK_Customer_PersonId");
            });

            modelBuilder.Entity<CustomerPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK__Customer__9B556A38D36FCFD5");

                entity.Property(e => e.PaymentId).ValueGeneratedNever();

                entity.HasOne(d => d.Payment)
                    .WithOne(p => p.CustomerPayment)
                    .HasForeignKey<CustomerPayment>(d => d.PaymentId)
                    .HasConstraintName("FK_CustomerPayment_PaymentId");

                entity.HasOne(d => d.SellInvoice)
                    .WithMany(p => p.CustomerPayment)
                    .HasForeignKey(d => d.SellInvoiceId)
                    .HasConstraintName("FK_CustomerPayment_SellInvoiceId");
            });

            modelBuilder.Entity<Good>(entity =>
            {
                entity.HasIndex(e => e.Sku)
                    .HasName("UQ__Good__CA1ECF0D36FD585B")
                    .IsUnique();

                entity.Property(e => e.Explanation).IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Sku)
                    .IsRequired()
                    .HasColumnName("SKU")
                    .HasMaxLength(13)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<GoodCategory>(entity =>
            {
                entity.HasKey(e => new { e.GoodId, e.CategoryId })
                    .HasName("PK__Good_Cat__A5AA769DFC7C6363");

                entity.ToTable("Good_Category");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.GoodCategory)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Good_Category_CategoryId");

                entity.HasOne(d => d.Good)
                    .WithMany(p => p.GoodCategory)
                    .HasForeignKey(d => d.GoodId)
                    .HasConstraintName("FK_Good_Category_GoodId");
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.Property(e => e.Date).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Invoice_UserId");
            });

            modelBuilder.Entity<InvoiceItem>(entity =>
            {
                entity.Property(e => e.GoodName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Good)
                    .WithMany(p => p.InvoiceItem)
                    .HasForeignKey(d => d.GoodId)
                    .HasConstraintName("FK_InvoiceItem_GoodId");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.InvoiceItem)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_InvoiceItem_InvoiceId");
            });

            modelBuilder.Entity<LoginToken>(entity =>
            {
                entity.HasKey(e => e.AuthenticationToken)
                    .HasName("PK__LoginTok__97D020CBA3FFAB2A");

                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__LoginTok__1788CC4D452DF58A")
                    .IsUnique();

                entity.Property(e => e.AuthenticationToken).ValueGeneratedNever();

                entity.Property(e => e.LastAccess)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.LoginToken)
                    .HasForeignKey<LoginToken>(d => d.UserId)
                    .HasConstraintName("FK_LoginToken_UserId");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Date).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<PeriodDiscount>(entity =>
            {
                entity.HasOne(d => d.User)
                    .WithMany(p => p.PeriodDiscount)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_PeriodDiscount_UserId");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasIndex(e => e.MobileNumber)
                    .HasName("UQ__Person__250375B179188996")
                    .IsUnique();

                entity.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MobileNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PurchaseInvoice>(entity =>
            {
                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.PurchaseInvoice)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PurchaseInvoice_InvoiceId");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.PurchaseInvoice)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PurchaseInvoice_SupplierId");
            });

            modelBuilder.Entity<SellInvoice>(entity =>
            {
                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.SellInvoice)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SellInvoice_CustomerId");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.SellInvoice)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SellInvoice_InvoiceId");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Supplier)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("FK_Supplier_PersonId");
            });

            modelBuilder.Entity<SupplierPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK__Supplier__9B556A3852CE810B");

                entity.Property(e => e.PaymentId).ValueGeneratedNever();

                entity.HasOne(d => d.Payment)
                    .WithOne(p => p.SupplierPayment)
                    .HasForeignKey<SupplierPayment>(d => d.PaymentId)
                    .HasConstraintName("FK_SupplierPayment_PaymentId");

                entity.HasOne(d => d.PurchaseInvoice)
                    .WithMany(p => p.SupplierPayment)
                    .HasForeignKey(d => d.PurchaseInvoiceId)
                    .HasConstraintName("FK_SupplierPayment_PurchaseInvoiceId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__User__A9D105344B3C7D66")
                    .IsUnique();

                entity.HasIndex(e => e.PersonId)
                    .HasName("UQ__User__AA2FFBE44AA4D1FA")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("UQ__User__536C85E4FC324C7D")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NationalIdcode)
                    .HasColumnName("NationalIDCode")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.HasOne(d => d.Person)
                    .WithOne(p => p.User)
                    .HasForeignKey<User>(d => d.PersonId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_User_PersonId");
            });
        }
    }
}
