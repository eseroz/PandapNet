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
    //[Authorize]
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
        [AllowAnonymous]
        public IEnumerable<Kullanici> Get()
        {

            var result = dc.Kullanicilar.ToList();
            return result;

        }


        [HttpPost]
        [AllowAnonymous]
        public ActionResult<Kullanici> Login(Kullanici kullaniciModel)
        {

            var kul = dc.Kullanicilar.Where(c => c.KullaniciId == kullaniciModel.KullaniciId)
                                    .Where(c => c.Parola == kullaniciModel.Parola)
                                    .FirstOrDefault();

            if (kul != null)
            {
                kul.Token = GenerateJwtToken(kul);
                return Ok(kul);
            }
            else
                return NotFound(new { message = "Kullanýcý Bulunamadý" });

        }


        private string GenerateJwtToken(Kullanici kul)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Secret").Value);

            var tokenDesc = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier,kul.KullaniciId),
                    new Claim(ClaimTypes.Name, kul.KullaniciAdSoyad),
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDesc);
            return tokenHandler.WriteToken(token);


        }

       
    }
}
