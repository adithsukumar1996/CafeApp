namespace CafeApp.Api.Models.DTO {
    public record GetCafeResponse {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required string Description { get; init; }
        public int Employees { get; init; }
        public string? Logo { get; init; }
        public required string Location { get; init; }
    }
}