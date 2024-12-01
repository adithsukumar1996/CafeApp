using System.ComponentModel.DataAnnotations;

namespace CafeApp.Api.Models.DTO {
    public record EditCafeRequest : AddCafeRequest {
        [Required]
        public required string Id { get; init; }
    }
}