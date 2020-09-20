using Microsoft.EntityFrameworkCore;
using pandap.api.DataModels;
using Pandap.Api.DataModels;

public class PandapDbContext:DbContext
{
    public DbSet<Kullanici> Kullanicilar { get; set; }
    public DbSet<FormTanim> FormTanims { get; set; }

    public DbSet<FormGunluk> FormGunluks { get; set; }

    public DbSet<FormYatayData> YatayDatas { get; set; }

    public DbSet<FormSoru> FormSorus { get; set; }

    public PandapDbContext(DbContextOptions<PandapDbContext> options) : base(options) { }

}