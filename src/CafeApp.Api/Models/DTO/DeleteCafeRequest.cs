using System.ComponentModel.DataAnnotations;
using CafeApp.Api.Validation;

namespace CafeApp.Api.Models.DTO {
    public record DeleteCafeRequest {
        [Required]
        public required string Id { get; init; }
    }
}