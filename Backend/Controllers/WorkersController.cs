using Backend.Data;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class WorkersController: ControllerBase
    {
        private readonly IWorkers _workersService;
         
        public WorkersController(IWorkers _workersService)
        {
            this._workersService = _workersService;
        }

        [HttpGet]
        [Route("GetUsersOfCompany")]
        public async Task<ActionResult> GetUsersOfCompany(string companyName){
            
            return await _workersService.GetUsersOfCompany(companyName);
        }
    }
}