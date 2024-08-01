using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface ISignIn
    {
        Task<ActionResult> SignIn(string userName, string userPassword);
    }
}