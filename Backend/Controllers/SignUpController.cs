using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly ISignUp _signUpService;
        public SignUpController(ISignUp _signUpService)
        {

            this._signUpService = _signUpService;
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            return await _signUpService.GetUserById(id);
        }

        [HttpGet("GetCompanyById/{id}")]
        public async Task<ActionResult<Company>> GetCompanyById(int id)
        {
            return await _signUpService.GetCompanyById(id);
        }

        [HttpPost("SignUpUser")]
        public async Task<ActionResult<User>> SignUpUser(string UserName, string Password, string SeedPhase)
        {
            return await _signUpService.SignUpUser(UserName, Password, SeedPhase);
        }

        [HttpPost("SignUpCompany")]
        public async Task<ActionResult<Company>> SignUpCompany(string CompanyName, string CompanyPassword)
        {
            return await _signUpService.SignUpCompany(CompanyName, CompanyPassword);
        }

        [HttpPost("SignUpAdmin")]
        public async Task<ActionResult<User>> SignUpAdmin(string UserName, string Password, string CompanyName, string CompanyPassword)
        {
            return await _signUpService.SignUpAdmin(UserName, Password, CompanyName, CompanyPassword);
        }
    }
}