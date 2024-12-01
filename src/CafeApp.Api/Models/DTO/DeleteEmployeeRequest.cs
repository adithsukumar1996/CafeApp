using System.ComponentModel.DataAnnotations;

namespace CafeApp.Api.Models.DTO {
    public record DeleteEmployeeRequest {
        [Required]
        public required string Id { get; init; }
    }
}