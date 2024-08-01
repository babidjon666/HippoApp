using Backend.Data;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProfileService: IProfile
    {
        private readonly ApplicationDbContext _context;

        public ProfileService(ApplicationDbContext _context)
        {
            this._context = _context;
        }

        public async Task<ActionResult> EditProfile(string oldName, string newName, string newPassword)
        {
            var checkName = await _context.Users.FirstOrDefaultAsync(u => u.UserName == newName);

            if (checkName != null){
                return new ConflictObjectResult("Bad Name!");
            }

            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == oldName);

            if (dbUser == null){
                return new ConflictObjectResult("Такого пользователя нет!");
            }

            dbUser.UserName = newName;
            dbUser.Password = newPassword;

            _context.Users.Update(dbUser);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Данные успешно изменены!");
        }
    }
}