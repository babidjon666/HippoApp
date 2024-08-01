using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface ISignUp
    {
        Task<ActionResult<User>> GetUserById(int id);
        Task<ActionResult<Company>> GetCompanyById(int id);
        Task<ActionResult<User>> SignUpUser(string UserName, string Password, string SeedPhase);
        Task<ActionResult<Company>> SignUpCompany(string CompanyName, string CompanyPassword);
        Task<ActionResult<User>> SignUpAdmin(string UserName, string Password, string CompanyName, string CompanyPassword);
    }
}