using Microsoft.IdentityModel.Tokens;

namespace WebApp.Models
{
    public interface IJwtSigningEncodingKey
    {
        string SigningAlgorithm { get; }
        SecurityKey GetKey();
    }
}