using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class SignUpService: ISignUp
    {
        private readonly ApplicationDbContext _context;
        private readonly SeedPhase seedPhase;

        public SignUpService(ApplicationDbContext _context)
        {
            this._context =_context;
            seedPhase = new SeedPhase();
        }

        public async Task<ActionResult<Company>> GetCompanyById(int id)
        {
            var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.Id == id);

            if (dbCompany == null)
            {
                return new NotFoundObjectResult("Компания не найдена!");
            }

            return dbCompany;
        }

        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (dbUser == null)
            {
                return new NotFoundObjectResult("Пользователь не найден!");
            }

            return dbUser;
        }

        public async Task<ActionResult<User>> SignUpAdmin(string UserName, string Password, string CompanyName, string CompanyPassword)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == UserName);

            if (dbUser != null)
            {
                return new ConflictObjectResult("Имя пользователя занято.");
            }

            var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.CompanyName == CompanyName);
            
            Company company;
            
            if (dbCompany != null)
            {
                company = dbCompany;
            }
            else
            {
                company = new Company
                {
                    SeedPhase = seedPhase.GetWords(),
                    CompanyName = CompanyName,
                    CompanyPassword = CompanyPassword
                };

                _context.Companies.Add(company);
                await _context.SaveChangesAsync(); 
            }

            var adminUser = new User
            {
                UserName = UserName,
                Password = Password,
                Role = UserRole.Admin,
                CompanyId = company.Id,
                CompanyName = company.CompanyName,
            };

            adminUser.OwnedCompanies.Add(company);
            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync();


            company.OwnerId = adminUser.Id;
            _context.Companies.Update(company);
            await _context.SaveChangesAsync(); 

            return new CreatedAtActionResult(nameof(GetUserById), "SignUp",new { id = adminUser.Id }, adminUser);
        }

        public async Task<ActionResult<Company>> SignUpCompany(string CompanyName, string CompanyPassword)
        {
            var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.CompanyName == CompanyName);

            if (dbCompany != null)
            {
                return new ConflictObjectResult("Имя компании занято.");
            }
            
            var company = new Company
            {
                SeedPhase = seedPhase.GetWords(),
                CompanyName = CompanyName,
                CompanyPassword = CompanyPassword
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync(); 

            return new CreatedAtActionResult(nameof(GetCompanyById), "SignUp", new { id = company.Id }, company);
        }

        public async Task<ActionResult<User>> SignUpUser(string UserName, string Password, string SeedPhase)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == UserName);

            var dbCompany = await _context.Companies.FirstOrDefaultAsync(c => c.SeedPhase == SeedPhase);

            if (dbUser != null)
            {
                return new ConflictObjectResult("Имя пользователя занято.");
            }

            if (dbCompany == null)
            {
                return new ConflictObjectResult("Неправильная сид фраза.");
            }

            var user = new User
            {
                UserName = UserName,
                Password = Password,
                Role = UserRole.Employee,
                CompanyId = dbCompany.Id,
                CompanyName = dbCompany.CompanyName
            };

            dbCompany.Users.Add(user);

            _context.Companies.Update(dbCompany);
  

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult(nameof(GetUserById), "SignUp", new { id = user.Id }, user);
        }
    }
}