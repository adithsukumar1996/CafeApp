using System.Data;
using CafeApp.Api.Configuration;
using CafeApp.Api.DataAccessLayer.CommandRepository;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.DataAccessLayer.QueryRepository;
using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using CafeApp.Api.DB;
using CafeApp.Api.Handlers;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using Serilog;
using SqlKata.Execution;

var builder = WebApplication.CreateBuilder (args);

//Configuring Serilog to log to the console
Log.Logger = new LoggerConfiguration ()
    .WriteTo.Console ()
    .CreateLogger ();

builder.Host.UseSerilog ();

// Register DB Connections
builder.Services.Configure<DatabaseSettings> (builder.Configuration.GetSection ("DatabaseSettings"));
builder.Services.AddScoped<IDbConnection> (sp => {
    var databaseSettings = sp.GetRequiredService<IOptions<DatabaseSettings>> ().Value;
    var connectionString = $"Data Source={databaseSettings.DatabaseName}";
    return new SqliteConnection (connectionString);
});
builder.Services.AddScoped<QueryFactory> (sp => {
    var connection = sp.GetRequiredService<IDbConnection> ();
    var compiler = new SqlKata.Compilers.SqliteCompiler ();
    return new QueryFactory (connection, compiler);
});

// Register repositories
builder.Services.AddScoped<ICafeQueryRepository, CafeQueryRepository> ();
builder.Services.AddScoped<ICafeCommandRepository, CafeCommandRepository> ();
builder.Services.AddScoped<IEmployeeQueryRepository, EmployeeQueryRepository> ();
builder.Services.AddScoped<IEmployeeCommandRepository, EmployeeCommandRepository> ();

// Register MediatR
builder.Services.AddMediatR (cfg => cfg.RegisterServicesFromAssembly (typeof (GetCafesByLocationHandler).Assembly));

// Add CORS services
builder.Services.AddCors (options => {
    options.AddPolicy ("AllowLocalhost5173",
        builder => builder
        .WithOrigins ("http://localhost:5173")
        .AllowAnyMethod ()
        .AllowAnyHeader ());
});

builder.Services.AddControllers ();
builder.Services.AddSingleton<InitDB> ();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();

var app = builder.Build ();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment ()) {
    app.UseSwagger ();
    app.UseSwaggerUI ();
}

//Error HandlingMiddleware
app.UseExceptionHandler (errorApp => {
    errorApp.Run (async context => {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature> ();

        if (exceptionHandlerPathFeature != null) {
            var exception = exceptionHandlerPathFeature.Error;

            //Handling Bad Request
            if (exception is ArgumentException) {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync (System.Text.Json.JsonSerializer.Serialize (new {
                    StatusCode = context.Response.StatusCode,
                        Message = exception.Message
                }));
                return;
            }

            Log.Error (exception, "An unhandled exception has occurred.");

            await context.Response.WriteAsync (System.Text.Json.JsonSerializer.Serialize (new {
                StatusCode = context.Response.StatusCode,
                    Message = "An internal server error has occurred."
            }));
        }
    });
});

app.UseCors ("AllowLocalhost5173");
app.UseHttpsRedirection ();
app.UseAuthorization ();
app.MapControllers ();

//Initialize the database
app.Services.GetRequiredService<InitDB> ().Initialize ();

app.Run ();