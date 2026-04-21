using System;
using System.Threading.Tasks;
using GiftedIQ.Application.DTOs;
using GiftedIQ.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace GiftedIQ.Infrastructure.RealTime;

public class SignalRNotificationDispatcher : INotificationDispatcher
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public SignalRNotificationDispatcher(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task DispatchToUserAsync(Guid userId, NotificationDto notification)
    {
        await _hubContext.Clients.Group(userId.ToString()).SendAsync("ReceiveNotification", notification);
    }
}