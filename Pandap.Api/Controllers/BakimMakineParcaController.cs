using Microsoft.AspNetCore.Mvc;
using Pandap.Api.DataModels;
using System.Collections.Generic;
using System.Linq;

namespace Pandap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BakimMakineParcaController: ControllerBase
    {
        PandapDbContext dc;

        public BakimMakineParcaController(PandapDbContext dc)
        {
            this.dc = dc;
        }

        [HttpGet]
        public List<BakimMakineParca> Makineler()
        {
            var result = dc.BakimMakineParca.ToList();
            return result;
        }

        [HttpGet]
        public List<BakimMakineParca> Parcalar()
        {
            var liste = dc.BakimMakineParca.Select(p => p.MakineAdi).Distinct();
            return (List<BakimMakineParca>)liste;
        }
    }
}