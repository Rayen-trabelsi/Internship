using System.ComponentModel.DataAnnotations;

namespace User.Management.API.Models.CRUD
{
    public class AddPasswordModel
    {

        [Required(ErrorMessage = "Website is required")]
        public string? Website { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Service is required")]
        public string? Service { get; set; }

        [Required(ErrorMessage = "Visible is required")]
        public bool Visible { get; set; }

        public string? UserId { get; set; }
    }
}
