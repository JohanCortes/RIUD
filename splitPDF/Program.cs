using Microsoft.OpenApi.Models;
using LovePdf.Core;
using LovePdf.Model.Task;
using LovePdf.Model.TaskParams;
using System.Net;
using System.IO;

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

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SplitPDF API V1");
});

app.MapGet(
    "/",
    (string url) =>
    {
        var api = new LovePdfApi(
            "project_public_d4e2646ff17fe3c05470a55087c6cac1_DJvjI7e1b243e2d164943e885c3265b3fbd0d",
            "secret_key_ca41c41e01f4ffd015017f6a7c5cf049_Vn7w1fbc9cadb3d7e8270aeee668dd80bc5c8"
        );
        var task = api.CreateTask<SplitTask>();
        // Add files to task for upload

        using (WebClient webClient = new WebClient())
        {
            string localFilePath = "temp/doc.pdf";
            webClient.DownloadFile(url, localFilePath);

            // Agregar archivo descargado a la tarea SplitTask
            task.AddFile(localFilePath);
        }
        // Set your tool options and Execute the task
        task.Process(new SplitParams(new SplitModeRanges("1-15")));
        // Download the package files
        task.DownloadFile("../src/assets/doc");
        File.Delete("temp/doc.pdf");
        return "Hello World!";
    }
);

app.Run();
