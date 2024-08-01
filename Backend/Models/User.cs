using System.Text.Json.Serialization;

namespace Backend.Models
{
    public enum UserRole
    {
        Employee,
        Admin
    }

    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public int? CompanyId { get; set; }  // Компания в которой работает
        public string CompanyName { get; set; } = string.Empty; // Имя компания в которой работает
        [JsonIgnore]
        public Company? Company { get; set; }  // Компания, в которой работает
        [JsonIgnore]
        public List<Company>? OwnedCompanies { get; set; }  = new List<Company>(); // Компании, которыми владеет
        [JsonIgnore]
        public List<AttendanceRecord>? AttendanceRecords { get; set; }  = new List<AttendanceRecord>();
    }
}