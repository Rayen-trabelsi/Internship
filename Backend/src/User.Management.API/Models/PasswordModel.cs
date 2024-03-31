using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using User.Management.API.Models.Authentication;

namespace User.Management.API.Models
{
    public class PasswordModel
    {
        [Key]
        public string PasswordId { get; set; }

        [Required(ErrorMessage = "Website is required")]
        public string? Website { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Service is required")]
        public string? Service { get; set; }

        [Required(ErrorMessage = "Visible is required")]
        public bool Visible { get; set; }
        
        //Relationship with AspNetUsers Table
        public string? UserId { get; set; } //Foreign Key
        public ApplicationUser? User { get; set; } //Reference Navigation Property
    }
}
