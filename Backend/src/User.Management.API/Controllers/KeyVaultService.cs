using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace User.Management.API.Controllers
{
    public class KeyVaultService
    {
        private readonly SecretClient _secretClient;

        public KeyVaultService(string keyVaultUri)
        {
            var credential = new DefaultAzureCredential();
            _secretClient = new SecretClient(new Uri(keyVaultUri), credential);
        }

        public string GetUserPassword()
        {
            KeyVaultSecret userPasswordSecret = _secretClient.GetSecret("UserPassword");
            return userPasswordSecret.Value;
        }

        public void AddUserPassword(string password)
        {
            _secretClient.SetSecret("UserPassword", password);
        }
    }
}
