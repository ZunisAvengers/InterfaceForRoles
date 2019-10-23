using Microsoft.IdentityModel.Tokens;

namespace WebApp.Models
{
    public interface IJwtSigningDecodingKey
    {
        SecurityKey GetKey();
    }
}