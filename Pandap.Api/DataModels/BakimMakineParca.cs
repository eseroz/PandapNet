using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pandap.Api.DataModels
{
    [Table("BAKIM_MAKINE_PARCA")]
    public class BakimMakineParca {

        [Key]
        public int Id { get; set; } 
        public string MakineAdi { get; set; } 
        public string BolumAdi { get; set; } 
        public string YerAdi { get; set; } 
    }

    public class Makine
    {
        public string MakineAdı { get; set; }
    }

    public class Parca
    {
        public int Id { get; set; }
        public string BolumAdi { get; set; }
    }

    public class Yer
    {
        public int Id { get; set; }
        public string YerAdi { get; set; }
    }
}
