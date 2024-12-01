using System.ComponentModel.DataAnnotations;

namespace CafeApp.Api.Models.DTO {
    public record DeleteCafeRequest {
        [Required]
        public required string Id { get; init; }
    }
}