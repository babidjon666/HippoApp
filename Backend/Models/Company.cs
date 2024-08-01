using System.Text.Json.Serialization;
namespace Backend.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string SeedPhase{ get; set; } = string.Empty;
        public int? OwnerId { get; set; }  
        [JsonIgnore]
        public User? Owner { get; set; } 
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyPassword { get; set; } = string.Empty;
        [JsonIgnore]
        public List<User> Users { get; set; } = new List<User>(); //Сотрудники, которые работают
        [JsonIgnore]
        public List<DailyTask> Tasks { get; set; } = new List<DailyTask>(); //Задачи компании
    }
}