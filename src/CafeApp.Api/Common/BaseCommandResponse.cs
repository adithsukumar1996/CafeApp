namespace CafeApp.Api.Common {
    public record BaseCommandResponse {
        public required string Id { get; init; }
    }
}