namespace CafeApp.Api.Models {
    public record Cafe {
        public Guid Id { get; init; }
        public required string Description { get; init; }
        public byte[] ? Logo { get; init; }
        public required string Location { get; init; }
    }
}