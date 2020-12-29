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
                .Where(c => c.GuncellemeTarihi!=null)
                .OrderByDescending(c=>c.GuncellemeTarihi)
                .ToListAsync();

            return Ok(liste);
        }

        public async Task<ActionResult<STOKTANIM>> StokTanimListeGetir()
        {
            var liste = await this._dc.StokTanims
                .ToListAsync();

            return Ok(liste);
        }

        public async Task<ActionResult<STOKTANIM>> StokTanimBul(string stokKod)
        {
            var stok = await this._dc.StokTanims
                .Where(c => c.STOK_KODU == stokKod)
                .FirstOrDefaultAsync();

            return Ok(stok);
        }

        [HttpPost]
        public  ActionResult<string> StokTanimGuncelle( [FromBody] STOKTANIM stokTanim)
        {
            var stok = this._dc.StokTanims
                .Where(c => c.STOK_KODU == stokTanim.STOK_KODU)
                .FirstOrDefault();

            stok.Miktar = stokTanim.Miktar;
            stok.GuncellemeTarihi = DateTime.Now;
            _dc.SaveChanges();

            return Ok("Guncellendi");
        }


    }
}
