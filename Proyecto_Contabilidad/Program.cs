var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "home",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "seat",
    pattern: "{controller=Seat}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "log",
    pattern: "{controller=Log}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "catalog",
    pattern: "{controller=Catalog}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "employee",
    pattern: "{controller=Employee}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "customer",
    pattern: "{controller=Customer}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "report",
    pattern: "{controller=Report}/{action=Index}/{id?}");





app.Run();
