using Dapper.Contrib.Extensions;

namespace CafeApp.Api.Models {
    public abstract record BaseModel {
        [Key]
        public int Pid { get; init; }

        private string? _createdBy = "System";
        public string? CreatedBy {
            get => _createdBy;
            init => _createdBy = value ?? "System";
        }

        private string? _modifiedBy = "System";
        public string? ModifiedBy {
            get => _modifiedBy;
            init => _modifiedBy = value ?? "System";
        }

        public DateTime CreatedDate { get; init; }

        private DateTime _modifiedDate = DateTime.UtcNow;
        public DateTime ModifiedDate {
            get => _modifiedDate;
            init => _modifiedDate = value != default ? value : DateTime.UtcNow;
        }
    }
}