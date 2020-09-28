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

    public class FormSoruController : ControllerBase
    {
        PandapDbContext dc;

        public FormSoruController(PandapDbContext dc)
        {
            this.dc = dc;
        }


        public List<FormSoru> FormSorulariGetir(string formAd)
        {
            var liste = dc.FormSorus.Where(c => c.FormAdi == formAd).ToList();

            return liste;

        }

    }
}
