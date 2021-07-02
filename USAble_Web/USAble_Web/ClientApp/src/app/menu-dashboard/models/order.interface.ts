export interface Order {
  Id: number,
  DiscountId?: number,
  SubTotal: number,
  PreTaxTotal: number,
  TotalTaxAmount: number,
  Total: number,
  CreatedBy: number,
  CreatedDate: Date
}
