using Backend.Data;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class WorkersService: IWorkers
    {
        private readonly ApplicationDbContext _context;

        public WorkersService(ApplicationDbContext _context)
        {
            this._context = _context;
        }

        public async Task<ActionResult> GetUsersOfCompany(string companyName)
        {
            var dbCompany = await _context.Companies
                                    .Include(c => c.Users)
                                    .FirstOrDefaultAsync(com => com.CompanyName == companyName);

            if (dbCompany == null){
                return new ConflictObjectResult("Такой компании нет!");
            }

            return new OkObjectResult(dbCompany.Users);
        }
    }
}