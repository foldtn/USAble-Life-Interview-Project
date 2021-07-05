import { UserPasswords } from './user-password.interface';
import { UserDto } from './user-dto.interface';

export interface UserRequest {
  User: UserDto,
  Password: UserPasswords,
}
