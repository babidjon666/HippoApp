using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface IAttendanceRecord
    {
        Task<ActionResult> DoAttendanceRecord(string userName, DateTime date, string startWorkTime, string endWorkTime);
        Task<ActionResult> GetAttendanceRecord(string userName);
        Task<FileResult> GeneratePdfReport(string userName);
    }
}