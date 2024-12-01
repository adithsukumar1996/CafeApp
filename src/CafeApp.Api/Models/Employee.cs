using Dapper.Contrib.Extensions;

namespace CafeApp.Api.Models {
    [Table ("Employee")]
    public record Employee : BaseModel {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required string EmailAddress { get; init; }
        public required string PhoneNumber { get; init; }
        public required string Gender { get; init; }
        public required int CafeId { get; init; }
        public required DateTime StartDate { get; init; }
    }
}