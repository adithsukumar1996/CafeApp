using System.ComponentModel.DataAnnotations;
using CafeApp.Api.Validation;

namespace CafeApp.Api.Models.DTO {
    public record DeleteEmployeeRequest {
        [Required]
        public required string Id { get; init; }
    }
}