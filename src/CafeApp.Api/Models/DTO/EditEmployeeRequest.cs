using System.ComponentModel.DataAnnotations;

namespace CafeApp.Api.Models.DTO {
    public record EditEmployeeRequest : AddEmployeeRequest {
        [Required]
        public required string Id { get; init; }
    }
}