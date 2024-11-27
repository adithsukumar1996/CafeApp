namespace CafeApp.Api.Models {
    public record Employee {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required string EmailAddress { get; init; }
        public required string PhoneNumber { get; init; }
        public required string Gender { get; init; }
        public required Guid CafeId { get; init; }
        public required DateTime StartDate { get; init; }
    }
}