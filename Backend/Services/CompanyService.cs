using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CompanyService: ICompany
    {
        private readonly ApplicationDbContext _context;
        private readonly SeedPhase seedPhase;

        public CompanyService(ApplicationDbContext _context)
        {
            this._context = _context;
            seedPhase = new SeedPhase();
        }

        public async Task<ActionResult> CreateNewCompany(string userName, string companyName, string companyPassword)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (dbUser == null){
                return new ConflictObjectResult("Такого пользователя нет!");
            }

            var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.CompanyName == companyName);

            if (dbCompany!= null){
                return new ConflictObjectResult("Имя компании занято!");
            }

            var company = new Company{
                SeedPhase = seedPhase.GetWords(),
                OwnerId = dbUser.Id,
                Owner = dbUser,
                CompanyName = companyName,
                CompanyPassword = companyPassword
            };

            company.Users.Add(dbUser);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            dbUser.OwnedCompanies.Add(company);
            _context.Users.Update(dbUser);
            await _context.SaveChangesAsync();

            return new OkObjectResult("Компания успешно добавлена пользователем " + dbUser.UserName.ToString());
        }

        public async Task<ActionResult> GetMyOwnCompanies(string userName)
        {
            var dbUser = await _context.Users
                .Include(u => u.OwnedCompanies) 
                .FirstOrDefaultAsync(u => u.UserName == userName);

            if (dbUser == null)
            {
                return new ConflictObjectResult("Такого пользователя нет!");
            }

            if (dbUser.Role == UserRole.Employee)
            {
                return new ConflictObjectResult("Вы не можете иметь компании!");
            }
            
            return new OkObjectResult(dbUser.OwnedCompanies);
        }
    }
}