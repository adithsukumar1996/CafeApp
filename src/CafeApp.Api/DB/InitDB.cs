using System.Data;
using CafeApp.Api.Configuration;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;

namespace CafeApp.Api.DB {
    public class InitDB {
        private readonly DatabaseSettings _databaseSettings;

        public InitDB (IOptions<DatabaseSettings> databaseSettings) {
            _databaseSettings = databaseSettings.Value;
        }

        public void Initialize () {
            if (!_databaseSettings.InitDb) {
                Console.WriteLine ("Database initialization is disabled.");
                return;
            }

            if (string.IsNullOrEmpty (_databaseSettings.DatabaseName)) {
                throw new InvalidOperationException ("Database name  is not configured properly.");
            }

            string scriptPath = Path.Combine (AppDomain.CurrentDomain.BaseDirectory, "DB", "InitDB.sql");
            if (!File.Exists (scriptPath)) {
                throw new FileNotFoundException ("Database initialization script not found.", scriptPath);
            }

            string script = File.ReadAllText (scriptPath);
            string connectionString = $"Data Source={_databaseSettings.DatabaseName}";

            using (IDbConnection connection = new SqliteConnection (connectionString)) {
                connection.Open ();
                using (var transaction = connection.BeginTransaction ()) {
                    try {
                        connection.Execute (script, transaction : transaction);
                        transaction.Commit ();
                        Console.WriteLine ("Database initialized successfully.");
                    } catch (Exception ex) {
                        transaction.Rollback ();
                        Console.WriteLine ($"Database initialization failed: {ex.Message}");
                        throw;
                    }
                }
            }
        }
    }
}