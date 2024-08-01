using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface IProfile
    {
         Task<ActionResult> EditProfile(string oldName,string newName, string newPassword);
    }
}