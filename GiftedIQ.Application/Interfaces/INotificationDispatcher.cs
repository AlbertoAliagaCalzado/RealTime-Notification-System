using System;
using System.Threading.Tasks;
using GiftedIQ.Application.DTOs;

namespace GiftedIQ.Application.Interfaces;

public interface INotificationDispatcher
{
    Task DispatchToUserAsync(Guid userId, NotificationDto notification);
}