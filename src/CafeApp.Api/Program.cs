using System.Data;
using CafeApp.Api.Configuration;
using CafeApp.Api.DB;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;
using SqlKata.Execution;

var builder = WebApplication.CreateBuilder (args);

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

app.UseHttpsRedirection ();
app.UseAuthorization ();
app.MapControllers ();

//Initialize the database
app.Services.GetRequiredService<InitDB> ().Initialize ();

app.Run ();

record WeatherForecast (DateOnly Date, int TemperatureC, string? Summary) {
    public int TemperatureF => 32 + (int) (TemperatureC / 0.5556);
}