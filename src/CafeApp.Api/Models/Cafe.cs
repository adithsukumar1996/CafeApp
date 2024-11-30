using Dapper.Contrib.Extensions;

namespace CafeApp.Api.Models {
    [Table ("Cafe")]
    public record Cafe : BaseModel {
        public Guid Id { get; init; }
        public required string Name { get; init; }
        public required string Description { get; init; }
        public byte[] ? Logo { get; init; }
        public required string Location { get; init; }
    }
}