using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers{

    [Route("api/[controller]")]
    public class ServerTasksController: ControllerBase{
        private readonly ApplicationDbContext _context;

        public ServerTasksController(ApplicationDbContext _context)
        {
            this._context = _context;
        }

        [HttpGet("GetListOfUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpDelete("DeleteAllUsers")]
        public async Task<ActionResult> DeleteAllUsers()
        {
            var users = await _context.Users.ToListAsync();
    
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found to delete.");
            }

            _context.Users.RemoveRange(users);

            await _context.SaveChangesAsync();

            return Ok("All users were delete"); 
        }

        [HttpGet("GetUsersInCompany")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersInCompany(string SeedPhase)
        {
            var company = await _context.Companies
                                .Include(c => c.Users)  
                                .FirstOrDefaultAsync(c => c.SeedPhase == SeedPhase);

            if (company == null)
            {
                return Conflict("Нет такой компании.");
            }

            return Ok(company.Users);
        }
    }
}