using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController: ControllerBase
    {
        private readonly IProfile _prifileService;

        public ProfileController(IProfile _prifileService)
        {
            this._prifileService = _prifileService;
        }

        [HttpPost]
        [Route("api/EditProfile")]
        public async Task<ActionResult> EditProfile(string oldName,string newName, string newPassword){
            return await _prifileService.EditProfile(oldName, newName, newPassword);
        }
    }
}