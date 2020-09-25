using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Pandap.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

      
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });

     

            services.AddControllers().
             AddJsonOptions(options =>
             {
                 options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                 options.JsonSerializerOptions.PropertyNamingPolicy = null;
             });


            services.AddDbContext<PandapDbContext>(options =>
                     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString")));
        }

    
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Use(async (context, next) =>
            {
                await next();

                if(context.Response.StatusCode==404)
                {
                    context.Request.Path = "/index.html";
                    await next();
                }

            });

            app.UseDefaultFiles();

             app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

         

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

