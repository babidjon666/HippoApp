using System.Text.Json.Serialization;
using System.Data;

namespace Backend.Models
{
    public class DailyTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CreatorId { get; set; }
        [JsonIgnore]
        public User? Creator { get; set; }
        public int ExecutorId { get; set; }
        [JsonIgnore]
        public User? Executor { get; set; }
        public bool IsImportant { get; set; }
        public DateTime TimeOfCreation = DateTime.Now;
        public DateTime TimeOfEnd { get; set; }
        public int CompanyId { get; set; }
        [JsonIgnore]
        public Company? Company { get; set; }
    }
}