using Dapper.Contrib.Extensions;

namespace CafeApp.Api.Models {
    [Table ("Cafe")]
    public record Cafe : BaseModel {
        public string Id { get; init; }
        public required string Name { get; init; }
        public required string Description { get; init; }
        public string? Logo { get; init; }
        public required string Location { get; init; }
    }
}