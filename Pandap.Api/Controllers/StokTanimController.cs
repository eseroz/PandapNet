using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pandap.Api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pandap.Api.Controllers
{

    [Route("api/[Controller]/[Action]")]
    public class StokTanimController:ControllerBase
    {
        public PandapDbContext _dc;
        public StokTanimController(PandapDbContext dc)
        {
            this._dc = dc;

        }

        public async Task<ActionResult<STOKTANIM>> StokTanimBarkodOkutulanListeGetir()
        {
            var liste = await this._dc.StokTanims
                .Where(c => c.Miktar.GetValueOrDefault() > 0)
                .ToListAsync();

            return Ok(liste);
        }

        public async Task<ActionResult<STOKTANIM>> StokTanimListeGetir()
        {
            var liste = await this._dc.StokTanims
                .ToListAsync();

            return Ok(liste);
        }

    }
}
