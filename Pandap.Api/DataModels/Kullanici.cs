
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pandap.api.DataModels
{
    [Table("KULLANICI")]
    public class Kullanici
    {
        [Key]
        public int Id { get; set; }
        public string KullaniciId { get; set; }

        public string Parola { get; set; }

        public string KullaniciRol { get; set; }

    }
}