using System.ComponentModel.DataAnnotations;

namespace CafeApp.Api.Models.DTO {
    public record AddEmployeeRequest {
        [Required]
        [StringLength (10, MinimumLength = 6, ErrorMessage = "Name must be between 6 and 10 characters.")]
        public required string Name { get; init; }

        [Required]
        [EmailAddress (ErrorMessage = "Invalid email address.")]
        public required string Email { get; init; }

        [Required]
        [RegularExpression (@"^[89]\d{7}$", ErrorMessage = "Phone number must start with 8 or 9 and have 8 digits.")]
        public required string PhoneNumber { get; init; }

        [Required]
        [RegularExpression (@"^[MFO]$", ErrorMessage = "Gender must be either 'M', 'F' or 'O'.")]
        public required string Gender { get; init; }

        [Required]
        public required string AssignedCafe { get; init; }
    }
}