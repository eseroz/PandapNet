using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pandap.Api.DataModels
{

    [Table("STOKTANIM")]
    public class STOKTANIM
    {

        [Key]
        public string STOK_KODU { get; set; }
        public string OLCU_BR1 { get; set; }
        public string STOKADI_TR { get; set; }
        public string GRUP_AD { get; set; }
        public string KOD1_AD { get; set; }
        public string KOD2_AD { get; set; }
        public string KOD3_AD { get; set; }
        public string KOD4_AD { get; set; }
        public string KOD5_AD { get; set; }
        public string GRUP_KODU { get; set; }

        public decimal? Miktar { get; set; }

        public DateTime? GuncellemeTarihi { get; set; }

    }
}
