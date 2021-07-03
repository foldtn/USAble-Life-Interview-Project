namespace USAble_Data.Models.Dtos
{
    public class OrderMenuItemDto
    {
        public MenuItemDto MenuItem { get; set; }
        public string CategoryName { get; set; }
        public int Quantity { get; set; }

        public OrderMenuItemDto()
        {

        }

        public OrderMenuItemDto(OrderMenuItems item)
        {
            MenuItem = new MenuItemDto(item.MenuItem);
            Quantity = item.Quantity;
        }
    }
}
