using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class AttendanceRecordController: ControllerBase
    {
        private readonly IAttendanceRecord _attendanceRecordService;

        public AttendanceRecordController(IAttendanceRecord _attendanceRecordService)
        {
            this._attendanceRecordService = _attendanceRecordService;
        }


        [HttpPost("DoAttendanceRecord")]
        public async Task<ActionResult> DoAttendanceRecord(string userName, DateTime date, string startWorkTime, string endWorkTime)
        {
            return await _attendanceRecordService.DoAttendanceRecord(userName, date, startWorkTime, endWorkTime);
        }

        [HttpGet("GetAttendanceRecord")]
        public async Task<ActionResult> GetAttendanceRecord(string userName){

             return await _attendanceRecordService.GetAttendanceRecord(userName);
        }

        [HttpGet("GeneratePdfReport")]
        public async Task<IActionResult> GeneratePdfReport(string userName)
        {
            var result = await _attendanceRecordService.GeneratePdfReport(userName);

            if (result == null)
            {
                return NotFound("Пользователь не найден");
            }

            return result;
        }
    }
}