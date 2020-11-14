

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace pandap.api.DataModels
{
    [Table("KULLANICI")]
    public class Kullanici
    {
        [Key]
        public string KullaniciId { get; set; }


        [JsonIgnore]
        public string Parola { get; set; }

        public string KullaniciAdSoyad { get; set; }

        public string Mail { get; set; }

        public string KullaniciRol { get; set; }

        public string YetkiliFormlar { get; set; }

        [NotMapped]
        public string Token { get;  set; }
    }
}