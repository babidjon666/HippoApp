using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers{
    [Route("api/[controller]")]
    public class CompanyController: ControllerBase{
        private readonly ICompany _companyService;

        public CompanyController(ICompany _companyService)
        {
            this._companyService = _companyService;
        }

        [HttpPost("CreateNewCompany")]
        public async Task<ActionResult> CreateNewCompany(string userName, string companyName, string companyPassword){

            return await _companyService.CreateNewCompany(userName, companyName, companyPassword);
        }

        [HttpGet("GetMyOwnCompanies")]
        public async Task<ActionResult> GetMyOwnCompanies(string userName)
        {
            return await _companyService.GetMyOwnCompanies(userName);
        }
    }
}