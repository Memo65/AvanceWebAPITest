using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPITest.Custom;
using WebAPITest.Models;
using Microsoft.AspNetCore.Authorization;
using WebAPITest.Services;

namespace WebAPITest.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManagementContext _userManagementContext;
        private readonly Utilities _utils;
        private readonly UserService _userService;
        public AuthController(UserManagementContext userManagementContext, Utilities utils, UserService userService)
        {
            _userManagementContext = userManagementContext;
            _utils = utils;
            _userService = userService;
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> Signin(User user)
        {

            bool response = await _userService.CreateUser(user);

            return Ok(new { isSuccess = response });

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequest userToLogin)
        {
            var userInDB = await _userManagementContext.Users
                                .Where(u => 
                                u.Email == userToLogin.Email &&
                                u.PasswordHash == _utils.EncryptSHA256(userToLogin.PasswordHash)
                                ).FirstOrDefaultAsync();

            if(userInDB == null)
                return Ok(new { isSuccess = false, token = ""});
            else
                return Ok(new { isSuccess = true, token = _utils.GenerateJWT(userInDB) });
        }


        [HttpGet]
        [Route("TokenValidation")]
        public IActionResult TokenValidation([FromQuery]string token)
        {
            bool response = _utils.TokenValidation(token);

            return Ok(new { isSuccess = response });
            
        }


    }
}
