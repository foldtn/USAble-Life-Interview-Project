export interface MenuItems {
  Id?: number;
  Name: string;
  Cost: number;
  MenuItemCategoryId?: number;
  Active?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date | null;
  ModifiedBy?: number | null;
  ModifiedDate?: Date | null;
}
