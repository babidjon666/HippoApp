using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface IWorkers
    {
         Task<ActionResult> GetUsersOfCompany(string companyName);
    }
}