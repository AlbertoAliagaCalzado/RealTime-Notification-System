using GiftedIQ.Application.Interfaces;
using GiftedIQ.Domain.Entities;
using GiftedIQ.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace GiftedIQ.Infrastructure.Persistence;

public class GiftedIqDbContext : DbContext, IUnitOfWork
{
    public GiftedIqDbContext(DbContextOptions<GiftedIqDbContext> options) : base(options) { }

    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Notification>(builder =>
        {
            builder.HasKey(n => n.Id);
            builder.Property(n => n.Id)
                   .HasConversion(
                       id => id.Value,
                       value => new NotificationId(value));
            builder.Property(n => n.Message).IsRequired().HasMaxLength(500);
        });
    }
}