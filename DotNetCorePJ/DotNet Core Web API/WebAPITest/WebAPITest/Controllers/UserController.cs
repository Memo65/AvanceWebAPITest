using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPITest.Models;
using WebAPITest.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;



namespace WebAPITest.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("allUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var users = await _userService.GetUserById(id);

            if (users.Count() == 0)
            {
                return NotFound();
            }

            return Ok(users.First());
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            bool response = await _userService.CreateUser(user);

            return Ok(new {isSuccess = response});
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(User user)
        {
            bool response = await _userService.UpdateUser(user);

            return Ok(new { isSuccess = response });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            bool response = await _userService.DeleteUser(id);

            return Ok(new { isSuccess = response });
        }



    }
}
