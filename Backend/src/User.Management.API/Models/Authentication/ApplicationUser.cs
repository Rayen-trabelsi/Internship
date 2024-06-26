﻿using Microsoft.AspNetCore.Identity;

namespace User.Management.API.Models.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Service { get; set; }
        // Relationship with Password Table
        public List<PasswordModel>? Passwords { get; set; }
    }
}
