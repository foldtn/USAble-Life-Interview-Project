import { Role } from './role.enum';

export interface User {
  id: number;
  username: number;
  password: string;
  firstName: string;
  lastName: string;
  userRole: Role;
  token?: string;
}
