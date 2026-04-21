using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftedIQ.Domain.Entities;
using GiftedIQ.Domain.Repositories;
using GiftedIQ.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace GiftedIQ.Infrastructure.Persistence;

public class NotificationRepository : INotificationRepository
{
    private readonly GiftedIqDbContext _context;

    public NotificationRepository(GiftedIqDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Notification notification)
    {
        await _context.Notifications.AddAsync(notification);
    }

    public async Task<Notification?> GetByIdAsync(NotificationId id)
    {
        return await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id);
    }

    public async Task<IEnumerable<Notification>> GetUnreadByUserIdAsync(Guid userId)
    {
        return await _context.Notifications
            .Where(n => n.RecipientId == userId && !n.IsRead)
            .ToListAsync();
    }

    public Task UpdateAsync(Notification notification)
    {
        _context.Notifications.Update(notification);
        return Task.CompletedTask;
    }
}