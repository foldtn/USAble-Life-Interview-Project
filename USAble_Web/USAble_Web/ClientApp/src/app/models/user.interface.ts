import { Role } from './role.enum';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: Role;
  token?: string;
}
