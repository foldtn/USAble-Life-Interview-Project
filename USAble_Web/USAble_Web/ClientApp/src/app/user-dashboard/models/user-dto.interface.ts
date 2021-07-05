import { UserRoleDto } from './user-role-dto.interface';

export interface UserDto {
  Id: number,
  Username: number,
  FirstName: string,
  LastName: string,
  UserRoleId: number,
  Active: boolean,
  CreatedBy: number,
  CreatedDate: Date,
  ModifiedBy?: number,
  ModifiedDate: Date,
  Password?: string,
  UserRole?: UserRoleDto
}
