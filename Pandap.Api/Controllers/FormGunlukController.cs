using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pandap.Api.DataModels;

namespace Pandap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    
    public class FormGunlukController : ControllerBase
    {
        PandapDbContext dc;

        public FormGunlukController(PandapDbContext dc)
        {
            this.dc = dc;
        }

 
        public List<FormGunluk> BugunBakilacaklar()
        {
            var liste = dc.FormGunluks.ToList();

            return liste;

        }

        public List<FormGunluk> FormGunlukGetirTarihten(DateTime tarih)
        {
            var liste = dc.FormGunluks
                .Where(c=>c.FormOlusturmaTarihi== tarih)
                .ToList();
            return liste;

        }

 

    }
}
