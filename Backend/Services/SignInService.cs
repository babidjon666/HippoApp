using Backend.Data;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class SignInService : ISignIn
    {
        private readonly ApplicationDbContext _context;

        public SignInService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult> SignIn(string userName, string userPassword)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(
                u => u.UserName == userName && u.Password == userPassword
            );

            if (dbUser == null)
            {
                return new NotFoundObjectResult("Такого пользователя нет!");
            }
            
            var myCompany = await _context.Companies.FirstOrDefaultAsync(c => c.OwnerId == dbUser.Id);

            if (myCompany == null)
            {
                var notMyCompany = await _context.Companies.FirstOrDefaultAsync(c => c.CompanyName == dbUser.CompanyName);

                var newResponse = new
                {
                    dbUser,
                    notMyCompany?.CompanyName
                };
                return new OkObjectResult(newResponse);
            }

            var response = new
            {
                dbUser,
                myCompany.SeedPhase
            };
            return new OkObjectResult(response);
        }
    }
}