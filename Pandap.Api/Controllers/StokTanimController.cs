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

        public async Task<ActionResult<vwStokTanim>> StokTanimBarkodOkutulanListeGetir()
        {
            var liste = await this._dc.StokTanims
                .Where(c => c.SayimGuncellemeTarihi!=null)
                .OrderByDescending(c=>c.SayimGuncellemeTarihi)
                .ToListAsync();

            return Ok(liste);
        }

        public async Task<ActionResult<vwStokTanim>> StokTanimListeGetir()
        {
            var liste = await this._dc.StokTanims
                .ToListAsync();

            return Ok(liste);
        }

        public async Task<ActionResult<vwStokTanim>> StokTanimBul(string stokKod)
        {
            var stok = await this._dc.StokTanims
                .Where(c => c.STOK_KODU == stokKod)
                .FirstOrDefaultAsync();

            return Ok(stok);
        }

        [HttpPost]
        public  ActionResult<string> StokTanimGuncelle( [FromBody] vwStokTanim stokTanim)
        {
            var stok = this._dc.StokTanims
                .Where(c => c.STOK_KODU == stokTanim.STOK_KODU)
                .FirstOrDefault();

            stok.SayimMiktar = stokTanim.SayimMiktar;
            stok.DosyaListesiJson = stokTanim.DosyaListesiJson;
            stok.SayimGuncellemeTarihi = DateTime.Now;
            _dc.SaveChanges();

            return Ok("Guncellendi");
        }

        [HttpGet]
        public async Task<IEnumerable<int>> GuncellemeDurumuSayilariGetir()
        {
            int kayitSayisi =await this._dc.StokTanims.CountAsync(); 
            var guncellenenKayitSayisi =await this._dc.StokTanims.Where(p => p.SayimGuncellemeTarihi != null).CountAsync();
            
            var sonuc= new int[] { guncellenenKayitSayisi, kayitSayisi };

            return sonuc;
        } 


    }
}


