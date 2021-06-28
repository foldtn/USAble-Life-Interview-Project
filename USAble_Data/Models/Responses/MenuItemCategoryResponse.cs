namespace USAble_Data.Models.Responses
{
    public class MenuItemCategoryResponse
    {
        public MenuItemCategories category { get; set; }
        public string errorMessage { get; set; }

        public MenuItemCategoryResponse(MenuItemCategories category)
        {
            this.category = category;
        }

        public MenuItemCategoryResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }
    }
}
