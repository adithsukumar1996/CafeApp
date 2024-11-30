using System.Data;
using CafeApp.Api.Configuration;
using CafeApp.Api.DataAccessLayer.CommandRepository;
using CafeApp.Api.DataAccessLayer.QueryRepository;
using CafeApp.Api.DB;
using CafeApp.Api.Handlers;
using MediatR;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using SqlKata.Execution;

var builder = WebApplication.CreateBuilder (args);

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
builder.Services.AddScoped<CafeQueryRepository> ();
builder.Services.AddScoped<CafeCommandRepository> ();
builder.Services.AddScoped<EmployeeQueryRepository> ();
builder.Services.AddScoped<EmployeeCommandRepository> ();

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

app.UseCors ("AllowLocalhost5173");
app.UseHttpsRedirection ();
app.UseAuthorization ();
app.MapControllers ();

//Initialize the database
app.Services.GetRequiredService<InitDB> ().Initialize ();

app.Run ();