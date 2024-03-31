using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using User.Management.API.Models;
using User.Management.API.Models.Authentication;
using User.Management.API.Models.Authentication.SignUp;
using User.Management.API.Models.CRUD;

namespace User.Management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles ="Admin")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;


        public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        // Test authorisation
        /*[HttpGet("Users")]
        public IEnumerable<string> Get()
        {
            return new List<string> { "Rayen", "Hamza", "Ali" };
        }*/

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserModel CreateUser, string role)
        {
            
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(CreateUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User already exists!" });
            }
            //var currentUser = await _userManager.GetUserAsync(User);
            // Create the user
            var user = new ApplicationUser
            {
                Email = CreateUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = CreateUser.Username,
                TwoFactorEnabled = CreateUser.TwoFactorEnabled,
                FirstName = CreateUser.FirstName,
                LastName = CreateUser.LastName,
                Service = CreateUser.Service,
                EmailConfirmed = true
            };

            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, CreateUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User failed to create." });
                }

                //Add role to the user....
                await _userManager.AddToRoleAsync(user, role);

                return StatusCode(StatusCodes.Status200OK,
                 new Response { Status = "Success", Message = $"User created successfully for service {user.Service}." });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "This role does not exist." });
            }

            
        }



        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(string userId)
        {
            //var currentUserService = (await _userManager.GetUserAsync(User))?.Service;
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null /*&& currentUserService != null && user.Service.Equals(currentUserService, StringComparison.OrdinalIgnoreCase)*/)
            {
                var getUser = new GetUserModel
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = await _userManager.GetRolesAsync(user),
                    Service = user.Service
                };
                return Ok(getUser);
            }
            else
            {
                // User not found or not authorized
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "This user does not exist or you are not authorized" });
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            //var currentUserService = (await _userManager.GetUserAsync(User))?.Service;
            var allUsers = _userManager.Users.ToList()  // Fetch all users to memory
                //.Where(user => user.Service.Equals(currentUserService, StringComparison.OrdinalIgnoreCase))
                .Select(user => new GetUserModel
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = _userManager.GetRolesAsync(user).Result.ToList(),
                    Service = user.Service
                }).ToList();

            return Ok(allUsers);
        }



        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, UpdateUserModel model)
        {
            //var currentUserService = (await _userManager.GetUserAsync(User))?.Service;
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null /*&& currentUserService != null && user.Service.Equals(currentUserService, StringComparison.OrdinalIgnoreCase)*/)
            {
                if (!string.IsNullOrEmpty(model.NewUsername))
                {
                    user.UserName = model.NewUsername;
                }

                if (!string.IsNullOrEmpty(model.NewEmail))
                {
                    user.Email = model.NewEmail;
                }

                if (!string.IsNullOrEmpty(model.NewPassword))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var resultP = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);

                    if (!resultP.Succeeded)
                    {
                        return BadRequest(resultP.Errors);
                    }
                }

                if (model.NewTwoFactorEnabled.HasValue)
                {
                    user.TwoFactorEnabled = model.NewTwoFactorEnabled.Value;
                }

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status200OK,
                 new Response { Status = "Success", Message = "User modified successfully." });
                }
                else
                {
                    // Handle the errors
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                // User not found or not authorized
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "This user does not exist or you are not authorized" });
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            //var currentUserService = (await _userManager.GetUserAsync(User))?.Service;
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null /*&& currentUserService != null && user.Service.Equals(currentUserService, StringComparison.OrdinalIgnoreCase)*/)
            {
                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status200OK,
                 new Response { Status = "Success", Message = "User deleted successfully." });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                // User not found or not authorized
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "This user does not exist or you are not authorized" });
            }
        }

        [HttpPost("CreatePassword")]
        public async Task<IActionResult> CreatePassword([FromBody] AddPasswordModel AddPass)
        {
            try
            {
                var Pass = new PasswordModel
                {
                    PasswordId = Guid.NewGuid().ToString(),
                    Website = AddPass.Website,
                    Password = AddPass.Password,
                    Visible = AddPass.Visible,
                    UserId = AddPass.UserId,
                    Service = AddPass.Service,
                };
                await _context.Passwords.AddAsync(Pass);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = "Password Added Successfully" });
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
            }
        }

        [HttpGet("GetPassword/{passwordId}")]
        public async Task<IActionResult> GetPassword(string passwordId)
        {
            try
            {
                var password = await _context.Passwords.FindAsync(passwordId);

                if (password == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "No Password was found" });
                }

                return Ok(password);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
            }
        }

        [HttpPut("UpdatePassword/{passwordId}")]
        public async Task<IActionResult> UpdatePassword(string passwordId, [FromBody] UpdatePasswordModel UpdatePass)
        {
            try
            {
                var existingPass = await _context.Passwords.FindAsync(passwordId);

                if (existingPass == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "No Password was found" });
                }

                if (!string.IsNullOrEmpty(UpdatePass.Website))
                {
                    existingPass.Website = UpdatePass.Website;
                }
                if (!string.IsNullOrEmpty(UpdatePass.Password))
                {
                    existingPass.Password = UpdatePass.Password;
                }
                if (UpdatePass.Visible.HasValue)
                {
                    existingPass.Visible = UpdatePass.Visible.Value;
                }

                _context.Passwords.Update(existingPass);
                await _context.SaveChangesAsync();

                return Ok(new Response { Status = "Success", Message = "Password Updated Successfully" });
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
            }
        }

        [HttpDelete("DeletePassword/{passwordId}")]
        public async Task<IActionResult> DeletePassword(string passwordId)
        {
            try
            {
                var password = await _context.Passwords.FindAsync(passwordId);

                if (password == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "No Password was found" });
                }

                _context.Passwords.Remove(password);
                await _context.SaveChangesAsync();

                return Ok(new Response { Status = "Success", Message = "Password Deleted Successfully" });
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
                            }
        }
        [HttpGet("GetPasswordsByUserId/{userId}")]
        public IActionResult GetPasswordsByUserId(string userId)
        {
            try
            {
                var user = _userManager.FindByIdAsync(userId).Result;
                if (user == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User not found" });
                }

                var passwords = _context.Passwords
                            .Where(p => p.UserId == userId)
                            .Select(p => new
                            {
                                PasswordId = p.PasswordId,
                                UserName = user.UserName,
                                Website = p.Website,
                                Password = p.Password,
                                Visible = p.Visible,
                            })
                            .ToList();

                if (passwords.Count == 0)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "No Password was found" });
                }

                return Ok(passwords);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
            }
        }

        [HttpGet("GetVisiblePasswordsByService/{Service}")]
        public IActionResult GetVisiblePasswordsByService(string Service)
        {
            try
            {
                var passwords = _context.Passwords
                    .Where(p => p.Service == Service)
                    .ToList();

                if (passwords.Count == 0)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "No Password was found" });
                }

                return Ok(passwords);
            }
            catch (Exception ex)
            {
                var errorMessage = "An error occurred while creating the password.";
                var exceptionMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    exceptionMessage = ex.InnerException.Message;
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = errorMessage, ExceptionMessage = exceptionMessage });
            }
        }






    }

}
