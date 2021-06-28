using Microsoft.Extensions.DependencyInjection;
using USAble_Services.Interfaces;
using USAble_Services.Services;

namespace USAble_UnitTests.Helpers
{
    public class Helper
    {

        public ServiceProvider GetServiceProvider()
        {
            var services = new ServiceCollection();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITaxService, TaxService>();
            services.AddTransient<IDiscountService, DiscountService>();
            services.AddTransient<IMenuItemCategoryService, MenuItemCategoryService>();
            services.AddTransient<IMenuItemService, MenuItemService>();
            services.AddTransient<IOrderService, OrderService>();

            return services.BuildServiceProvider();
        }
    }
}
