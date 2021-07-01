export interface Discount {
  Id?: number;
  Name: string;
  Amount: number;
  DiscountType: number;
  Active?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date | null;
  ModifiedBy?: number | null;
  ModifiedDate?: Date | null;
}
