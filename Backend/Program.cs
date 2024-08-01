using Backend.Data;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Установка порта для приложения
builder.WebHost.UseUrls("http://*:80");

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add the connection string from the configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register DbContext with the connection string
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<ISignIn, SignInService>();
builder.Services.AddScoped<ISignUp, SignUpService>();
builder.Services.AddScoped<IProfile, ProfileService>();
builder.Services.AddScoped<ICompany, CompanyService>();
builder.Services.AddScoped<IWorkers, WorkersService>();
builder.Services.AddScoped<IAttendanceRecord, AttendanceRecordService>();

// Add controllers and configure JSON options to support cycles
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    });

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();