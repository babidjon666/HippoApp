using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace Backend.Services
{
    public class AttendanceRecordService: IAttendanceRecord
    {
        private readonly ApplicationDbContext _context;

        public AttendanceRecordService(ApplicationDbContext _context)
        {
            this._context =_context;
        }

        public async Task<ActionResult> DoAttendanceRecord(string userName, DateTime date, string startWorkTime, string endWorkTime)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (dbUser == null)
            {
                return new NotFoundObjectResult("Пользователь не найден!");
            }

            if (dbUser.CompanyId == null)
            {
                return new BadRequestObjectResult("Пользователь не привязан к компании.");
            }

            if (!TimeSpan.TryParse(startWorkTime, out var checkInTime))
            {
                return new BadRequestObjectResult("Неверный формат времени начала работы.");
            }

            if (!TimeSpan.TryParse(endWorkTime, out var checkOutTime))
            {
                return new BadRequestObjectResult("Неверный формат времени окончания работы.");
            }

            var attendanceRecord = new AttendanceRecord
            {
                UserId = dbUser.Id,
                Date = date.Date,
                CheckInTime = checkInTime,
                CheckOutTime = checkOutTime,
                CompanyId = (int)dbUser.CompanyId,
                User = dbUser
            };

            _context.AttendanceRecords.Add(attendanceRecord);
            await _context.SaveChangesAsync();

            return new OkObjectResult($"Посещаемость {dbUser.UserName} за {date.Date} добавлена!");
        }

        public async Task<ActionResult> GetAttendanceRecord(string userName)
        {
            var dbUser = await _context.Users
                .Include(u => u.AttendanceRecords) 
                .FirstOrDefaultAsync(u => u.UserName == userName);

            if (dbUser == null){
                return new NotFoundObjectResult("Пользователь не найдет");
            }

            return new OkObjectResult(dbUser.AttendanceRecords);
        }

        public async Task<FileResult> GeneratePdfReport(string userName)
        {
            var dbUser = await _context.Users
                .Include(u => u.AttendanceRecords)
                .FirstOrDefaultAsync(u => u.UserName == userName);

            if (dbUser == null)
            {
                return null;
            }

            using (var stream = new MemoryStream())
            {
                var writerProperties = new WriterProperties();
                var writer = new PdfWriter(stream, writerProperties);
                var pdf = new PdfDocument(writer);
                var document = new Document(pdf);

                document.Add(new Paragraph($"AttendanceRecord for {dbUser.UserName}").SetTextAlignment(TextAlignment.CENTER));
                document.Add(new Paragraph(" "));

                // Создаем таблицу с фиксированными размерами колонок
                var table = new Table(UnitValue.CreatePercentArray(new float[] { 1, 2, 2, 2 })).UseAllAvailableWidth();
                
                // Добавляем заголовки колонок
                table.AddHeaderCell(new Cell().Add(new Paragraph(" ")).SetTextAlignment(TextAlignment.CENTER));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Date")).SetTextAlignment(TextAlignment.CENTER));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Start Time")).SetTextAlignment(TextAlignment.CENTER));
                table.AddHeaderCell(new Cell().Add(new Paragraph("End Time")).SetTextAlignment(TextAlignment.CENTER));

                var n = 1;
                foreach (var record in dbUser.AttendanceRecords)
                {
                    table.AddCell(new Cell().Add(new Paragraph(n.ToString())).SetTextAlignment(TextAlignment.CENTER));
                    table.AddCell(new Cell().Add(new Paragraph(record.Date.ToShortDateString())).SetTextAlignment(TextAlignment.CENTER));
                    table.AddCell(new Cell().Add(new Paragraph(record.CheckInTime.ToString().Substring(0, 5))).SetTextAlignment(TextAlignment.CENTER));
                    table.AddCell(new Cell().Add(new Paragraph(record.CheckOutTime.ToString().Substring(0, 5))).SetTextAlignment(TextAlignment.CENTER));
                    n++;
                }

                document.Add(table);
                document.Close();

                var fileResult = new FileContentResult(stream.ToArray(), "application/pdf")
                {
                    FileDownloadName = $"AttendanceReport_{userName}.pdf"
                };

                return fileResult;
            }
        }

}}