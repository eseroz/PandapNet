using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using pandap.api.DataModels;

namespace pandap.api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class KullaniciController : ControllerBase
    {
        PandapDbContext dc;
        private IConfiguration configuration;

        public KullaniciController(PandapDbContext dc, IConfiguration configuration)
        {
            this.dc = dc;
            this.configuration = configuration;
        }


        [HttpGet]
         public Kullanici KullaniciGetir()
        {
            var result = dc.Kullanicilar.First();
            return result;

        }

        [HttpPost]
        [AllowAnonymous]
        public User KullaniciKontrol([FromQuery]string kullaniciId)
        {
            var u= GenerateJwtToken();

            var user = new User();
            user.FirstName = "gokmen";
            user.Token = u;

            return user;


        }

        private string GenerateJwtToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Secret").Value);

            var tokenDesc = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, "gokmen1977"),
                    new Claim(ClaimTypes.Name, "gokmen"),
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDesc);
            return tokenHandler.WriteToken(token);


        }

        [HttpGet]
        public IEnumerable<Kullanici> Get()
        {

            var result = dc.Kullanicilar.ToList();
            return result;

        }
    }
}
