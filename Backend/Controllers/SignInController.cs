using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class SignInController: ControllerBase
    {
        private readonly ISignIn _signInService;

        public SignInController(ISignIn _signInService)
        {
            this._signInService = _signInService;
        }

        [HttpPost]
        public async Task<ActionResult> SignIn(string userName, string userPassword){
            
            return await _signInService.SignIn(userName, userPassword);
        }
    }
}