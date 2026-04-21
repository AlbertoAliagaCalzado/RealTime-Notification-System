using GiftedIQ.Application.Commands.CreateNotification;
using GiftedIQ.Application.Interfaces;
using GiftedIQ.Domain.Repositories;
using GiftedIQ.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(CreateNotificationCommand).Assembly));

builder.Services.AddDbContext<GiftedIqDbContext>(options =>
    options.UseInMemoryDatabase("GiftedIqDb"));

builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

builder.Services.AddScoped<IUnitOfWork>(provider => 
    provider.GetRequiredService<GiftedIqDbContext>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();