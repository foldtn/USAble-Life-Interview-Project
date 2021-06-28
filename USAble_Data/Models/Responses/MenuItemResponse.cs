namespace USAble_Data.Models.Responses
{
    public class MenuItemResponse
    {
        public MenuItems menuItem { get; set; }
        public string errorMessage { get; set; }

        public MenuItemResponse(MenuItems menuItem)
        {
            this.menuItem = menuItem;
        }

        public MenuItemResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }
    }
}
