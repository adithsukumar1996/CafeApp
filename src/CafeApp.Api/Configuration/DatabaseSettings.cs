namespace CafeApp.Api.Configuration {
    public record DatabaseSettings {
        public bool InitDb { get; init; }
        private string? _databaseName;
        public required string DatabaseName {
            get => _databaseName ??
                throw new NullReferenceException ("DatabaseName is null");
            init => _databaseName = value;
        }
    }
}