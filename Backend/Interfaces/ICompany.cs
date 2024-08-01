using Microsoft.AspNetCore.Mvc;

namespace Backend.Interfaces
{
    public interface ICompany
    {
        Task<ActionResult> CreateNewCompany(string userName, string companyName, string companyPassword);
        Task<ActionResult> GetMyOwnCompanies(string userName);
    }
}