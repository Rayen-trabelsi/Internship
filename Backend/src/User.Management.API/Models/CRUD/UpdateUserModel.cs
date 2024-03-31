using System.ComponentModel.DataAnnotations;

namespace User.Management.API.Models.CRUD
{
    public class UpdateUserModel
    {


        public string? NewUsername { get; set; }

        [EmailAddress]

        public string? NewEmail { get; set; }


        public string? NewPassword { get; set; }


        public bool? NewTwoFactorEnabled { get; set; }

        /*[Required(ErrorMessage = "Role is required ")]
        public bool? NewRole { get; set; }*/
    }
}
