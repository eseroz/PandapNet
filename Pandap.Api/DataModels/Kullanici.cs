
using System.ComponentModel.DataAnnotations.Schema;

namespace pandap.api.DataModels
{
    [Table("KULLANICI")]
    public class Kullanici
    {
        public int Id { get; set; }
        public string KullaniciId { get; set; }

    }
}