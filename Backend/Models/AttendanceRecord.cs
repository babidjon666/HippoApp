using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AttendanceRecord
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan? CheckInTime { get; set; }
        public TimeSpan? CheckOutTime { get; set; }
        public int CompanyId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}