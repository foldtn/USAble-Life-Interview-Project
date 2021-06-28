export interface Tax {
  Id?: number;
  Name: string;
  Amount: number;
  Active?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date | null;
  ModifiedBy?: number | null;
  ModifiedDate?: Date | null;
}
