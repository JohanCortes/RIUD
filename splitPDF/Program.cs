using Microsoft.OpenApi.Models;
using LovePdf.Core;
using LovePdf.Model.Task;
//using System.Web;
using LovePdf.Model.TaskParams;
using System.Net.Http;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "SplitPDF API",
            Description = "Spliting with LovePDF API",
            Version = "v1"
        }
    );
});
builder.Services.AddCors();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SplitPDF API V1");
});

//Config CORS
app.UseCors(
    options => options.WithOrigins("http://192.168.20.74").AllowAnyMethod().AllowAnyHeader()
);

app.UseCors(a => a.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapGet(
    "/",
    async (string url) =>
    {
        var api = new LovePdfApi(
            "project_public_d4e2646ff17fe3c05470a55087c6cac1_DJvjI7e1b243e2d164943e885c3265b3fbd0d",
            "secret_key_ca41c41e01f4ffd015017f6a7c5cf049_Vn7w1fbc9cadb3d7e8270aeee668dd80bc5c8"
        );
        var task = api.CreateTask<SplitTask>();
        string[] name = url.Split('/');
        string normalName = new String (name.Last().Normalize(NormalizationForm.FormD)
            .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
            .ToArray()).Normalize(NormalizationForm.FormC);
        string localFilePath = $"temp/{normalName}";
        string downloadPath = "../src/assets/doc";
        if (File.Exists(downloadPath + "/" + normalName.Replace(".", "-1-15.")))
        {
            Console.WriteLine($"File {normalName} already exists");
            return $"File {normalName} already exists";
        }
        else
        {
            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpResponseMessage response = await httpClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        using (
                            Stream contentStream = await response.Content.ReadAsStreamAsync(),
                                fileStream = new FileStream(
                                    localFilePath,
                                    FileMode.Create,
                                    FileAccess.Write
                                )
                        )
                        {
                            await contentStream.CopyToAsync(fileStream);
                        }
                    }
                    else
                    {
                        Console.WriteLine("Error al descargar el archivo.");
                        return "Error al descargar el archivo";
                    }
                }
            }

            task.AddFile(localFilePath);
            task.Process(new SplitParams(new SplitModeRanges("1-15")));
            task.DownloadFile(downloadPath);
            File.Delete(localFilePath);
            Console.WriteLine($"File {normalName} Splited");
            return $"{normalName} Splited";
        }
    }
);

app.Run();
