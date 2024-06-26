﻿using System.ComponentModel.DataAnnotations;

namespace User.Management.API.Models.CRUD
{
    public class CreateUserModel
    {
        [Required(ErrorMessage = "FirstName is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Service is required")]
        public string? Service { get; set; }

        [Required(ErrorMessage = "2auth param is required")]
        public bool TwoFactorEnabled { get; set; }

    }
}
